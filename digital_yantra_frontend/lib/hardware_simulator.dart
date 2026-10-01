import 'package:flutter/material.dart';
import 'dart:math' as math;
import 'theme.dart';

class HardwareSimulator extends StatefulWidget {
  const HardwareSimulator({Key? key}) : super(key: key);

  @override
  State<HardwareSimulator> createState() => _HardwareSimulatorState();
}

class _HardwareSimulatorState extends State<HardwareSimulator> {
  // Interactive State Variables (Controllable by Recruiters)
  double _visorThickness = 24.0;
  double _chassisRadius = 16.0;
  double _internalComponentExplosion = 0.0; // 0.0 = Assembled, 1.0 = Fully Exploded
  bool _showDigitalYantraTracks = true;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24.0),
      decoration: BoxDecoration(
        color: YantraTokens.parchmentBg,
        borderRadius: BorderRadius.circular(8.0),
        border: Border.all(color: YantraTokens.structuralInk.withOpacity(0.2), width: 1.5),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Widget Header Section
          const Text(
            "INTERACTIVE DESIGN LAB // REAL-TIME MODEL GENERATOR",
            style: TextStyle(
              fontFamily: 'RobotoMono',
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: YantraTokens.blueprintCyan,
              letterSpacing: 1.5,
            ),
          ),
          const SizedBox(height: 16.0),

          // Main Split Viewport (Canvas on Left/Top, Controls on Right/Bottom)
          LayoutBuilder(
            builder: (context, constraints) {
              bool isWide = constraints.maxWidth > 700;
              
              Widget canvasWidget = Container(
                height: 350,
                width: isWide ? constraints.maxWidth * 0.55 : double.infinity,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.7),
                  borderRadius: BorderRadius.circular(4.0),
                  border: Border.all(color: YantraTokens.structuralInk.withOpacity(0.1)),
                ),
                child: CustomPaint(
                  painter: BlueprintCanvasPainter(
                    visorThickness: _visorThickness,
                    chassisRadius: _chassisRadius,
                    explosionFactor: _internalComponentExplosion,
                    showTracks: _showDigitalYantraTracks,
                  ),
                ),
              );

              Widget controlsWidget = Container(
                width: isWide ? constraints.maxWidth * 0.40 : double.infinity,
                padding: const EdgeInsets.all(12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Parametric Controls (Talamana Matrix)",
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: YantraTokens.structuralInk),
                    ),
                    const SizedBox(height: 16),
                    
                    // Visor Height Control
                    _buildSliderSetting(
                      label: "Camera Visor Scale",
                      value: _visorThickness,
                      min: 10.0,
                      max: 45.0,
                      onChanged: (val) => setState(() => _visorThickness = val),
                    ),
                    
                    // Corner Radius Control
                    _buildSliderSetting(
                      label: "Chassis Curvature (Corner Radius)",
                      value: _chassisRadius,
                      min: 4.0,
                      max: 32.0,
                      onChanged: (val) => setState(() => _chassisRadius = val),
                    ),

                    // Exploded-View Architecture Control
                    _buildSliderSetting(
                      label: "Exploded Anatomy Split",
                      value: _internalComponentExplosion,
                      min: 0.0,
                      max: 1.0,
                      onChanged: (val) => setState(() => _internalComponentExplosion = val),
                    ),

                    // Layer Visibility Toggle
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text("Render PCB Copper 'Yantra' Tracks", style: TextStyle(fontSize: 13, color: YantraTokens.structuralInk)),
                        Switch(
                          value: _showDigitalYantraTracks,
                          activeColor: YantraTokens.blueprintCyan,
                          onChanged: (val) => setState(() => _showDigitalYantraTracks = val),
                        ),
                      ],
                    ),
                  ],
                ),
              );

              return isWide 
                ? Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [canvasWidget, controlsWidget])
                : Column(children: [canvasWidget, const SizedBox(height: 20), controlsWidget]);
            },
          ),
        ],
      ),
    );
  }

  Widget _buildSliderSetting({
    required String label, 
    required double value, 
    required double min, 
    required double max, 
    required ValueChanged<double> onChanged
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 14.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(label, style: const TextStyle(fontSize: 13, color: YantraTokens.structuralInk)),
              Text(value.toStringAsFixed(1), style: const TextStyle(fontFamily: 'RobotoMono', fontSize: 13, fontWeight: FontWeight.bold)),
            ],
          ),
          Slider(
            value: value,
            min: min,
            max: max,
            activeColor: YantraTokens.geometricGold,
            inactiveColor: YantraTokens.structuralInk.withOpacity(0.1),
            onChanged: onChanged,
          ),
        ],
      ),
    );
  }
}

class BlueprintCanvasPainter extends CustomPainter {
  final double visorThickness;
  final double chassisRadius;
  final double explosionFactor;
  final bool showTracks;

  BlueprintCanvasPainter({
    required this.visorThickness,
    required this.chassisRadius,
    required this.explosionFactor,
    required this.showTracks,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    
    final blueprintPaint = Paint()
      ..color = YantraTokens.blueprintCyan.withOpacity(0.4)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.0;

    final hardwarePaint = Paint()
      ..color = YantraTokens.structuralInk
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0;

    final goldPaint = Paint()
      ..color = YantraTokens.geometricGold.withOpacity(0.6)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.5;

    // 1. Draw Background Sacred Math/Grid Lines (The Talamana Matrix)
    canvas.drawCircle(center, size.height * 0.4, blueprintPaint);
    canvas.drawLine(Offset(0, center.dy), Offset(size.width, center.dy), blueprintPaint);
    canvas.drawLine(Offset(center.dx, 0), Offset(center.dx, size.height), blueprintPaint);

    // 2. Render Outer Chassis Geometry
    final double mainWidth = 120.0;
    final double mainHeight = 220.0;
    double chassisOffset = explosionFactor * 40.0;
    
    RRect outerChassis = RRect.fromRectAndRadius(
      Rect.fromCenter(center: Offset(center.dx, center.dy + chassisOffset), width: mainWidth, height: mainHeight),
      Radius.circular(chassisRadius),
    );
    canvas.drawRRect(outerChassis, hardwarePaint);

    // 3. Render Internal Digital Yantra (PCB Tracks Layer)
    if (showTracks) {
      double pcbOffset = explosionFactor * -10.0;
      final pcbRect = Rect.fromCenter(center: Offset(center.dx, center.dy + pcbOffset), width: mainWidth - 16, height: mainHeight - 50);
      canvas.drawRect(pcbRect, blueprintPaint);
      for (int i = 0; i < 4; i++) {
        double innerStep = i * 15.0;
        canvas.drawCircle(Offset(center.dx - 20 + innerStep, center.dy + pcbOffset), 8 + innerStep, goldPaint);
      }
    }

    // 4. Render Dynamic Camera Visor Module Layer
    double visorOffset = explosionFactor * -60.0; 
    RRect cameraVisor = RRect.fromRectAndRadius(
      Rect.fromCenter(
        center: Offset(center.dx, center.dy - (mainHeight / 3) + visorOffset), 
        width: mainWidth - 8, 
        height: visorThickness
      ),
      const Radius.circular(8.0),
    );
    
    canvas.drawRRect(cameraVisor, hardwarePaint..strokeWidth = 2.5);
    canvas.drawCircle(Offset(center.dx - 25, center.dy - (mainHeight / 3) + visorOffset), visorThickness * 0.25, hardwarePaint);
    canvas.drawCircle(Offset(center.dx, center.dy - (mainHeight / 3) + visorOffset), visorThickness * 0.25, hardwarePaint);
    canvas.drawCircle(Offset(center.dx + 25, center.dy - (mainHeight / 3) + visorOffset), visorThickness * 0.20, hardwarePaint);
  }

  @override
  bool shouldRepaint(covariant BlueprintCanvasPainter oldDelegate) {
    return oldDelegate.visorThickness != visorThickness ||
        oldDelegate.chassisRadius != chassisRadius ||
        oldDelegate.explosionFactor != explosionFactor ||
        oldDelegate.showTracks != showTracks;
  }
}
