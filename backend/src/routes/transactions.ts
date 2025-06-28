import { Router, Response, NextFunction } from "express";
import Offer from "../models/Offer";
import Transaction from "../models/Transaction";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

// POST /api/transactions/:offerId - Realizar transacción (comprar oferta)
router.post("/:offerId", authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user.role !== "buyer") {
      res.status(403).json({ message: "Solo compradores pueden adquirir ofertas" });
      return;
    }

    const offer = await Offer.findOne({
      _id: req.params.offerId,
      isSold: false,
      availableFrom: { $lte: new Date() },
      availableTo: { $gte: new Date() },
    });

    if (!offer) {
      res.status(404).json({ message: "Oferta no válida o ya vendida" });
      return;
    }

    // Marcar oferta como vendida
    offer.isSold = true;
    await offer.save();

    // Crear transacción
    const totalPrice = offer.kWh * offer.pricePerKWh;

    const transaction = new Transaction({
      offerId: offer._id,
      sellerId: offer.sellerId,
      buyerId: req.user.userId,
      kWh: offer.kWh,
      pricePerKWh: offer.pricePerKWh,
      totalPrice,
    });

    await transaction.save();

    res.status(201).json({ message: "Transacción realizada con éxito", transaction });
  } catch (error) {
    next(error);
  }
});

// GET /api/transactions - Historial del usuario (comprador o vendedor)
router.get("/", authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filter = req.user.role === "buyer"
      ? { buyerId: req.user.userId }
      : { sellerId: req.user.userId };

    const transactions = await Transaction.find(filter).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});

export default router;
