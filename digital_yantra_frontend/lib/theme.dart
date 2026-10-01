import 'package:flutter/material.dart';

// --- Global Portfolio Design Tokens ---
class DigitalYantraTheme {
  static const Color parchmentBg = Color(0xFFF7F4EB);
  static const Color structuralInk = Color(0xFF1E242B);
  static const Color geometricGold = Color(0xFFD4AF37);
  static const Color blueprintCyan = Color(0xFF00A8B5);

  static const TextStyle titleStyle = TextStyle(
    fontFamily: 'Cinzel',
    fontSize: 28,
    fontWeight: FontWeight.bold,
    color: structuralInk,
    letterSpacing: 2.0,
  );

  static const TextStyle bodyInkStyle = TextStyle(
    fontFamily: 'RobotoMono',
    fontSize: 14,
    color: structuralInk,
    height: 1.6,
  );
}

// Alias for YantraTokens
typedef YantraTokens = DigitalYantraTheme;
