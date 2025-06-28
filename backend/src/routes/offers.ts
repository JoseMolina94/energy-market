import { Router, Response, NextFunction } from "express";
import Offer from "../models/Offer";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

// GET /api/offers - Listar ofertas activas (no requiere auth)
router.get("/", async (_req, res: Response, next: NextFunction): Promise<void> => {
  try {
    const now = new Date();
    const offers = await Offer.find({
      isSold: false,
      availableFrom: { $lte: now },
      availableTo: { $gte: now },
    });

    res.json(offers);
  } catch (error) {
    next(error);
  }
});

// POST /api/offers - Crear una oferta (requiere auth, rol vendedor)
router.post("/", authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { kWh, pricePerKWh, availableFrom, availableTo } = req.body;

    if (req.user.role !== "seller") {
      res.status(403).json({ message: "Solo vendedores pueden crear ofertas" });
      return;
    }

    const newOffer = new Offer({
      sellerId: req.user.userId,
      kWh,
      pricePerKWh,
      availableFrom,
      availableTo,
    });

    await newOffer.save();
    res.status(201).json({ message: "Oferta creada", offer: newOffer });
  } catch (error) {
    next(error);
  }
});

// POST /api/offers/:id/buy - Comprar una oferta (requiere auth, rol comprador)
router.post("/:id/buy", authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user.role !== "buyer") {
      res.status(403).json({ message: "Solo compradores pueden adquirir ofertas" });
      return;
    }

    const offer = await Offer.findOne({
      _id: req.params.id,
      isSold: false,
      availableFrom: { $lte: new Date() },
      availableTo: { $gte: new Date() },
    });

    if (!offer) {
      res.status(404).json({ message: "Oferta no disponible o ya vendida" });
      return;
    }

    offer.isSold = true;
    await offer.save();

    res.json({ message: "Compra exitosa", offer });
  } catch (error) {
    next(error);
  }
});

export default router;
