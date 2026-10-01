import React, { useState } from 'react';
import { X, Smartphone, Code2, Copy, CheckCheck, Layers, Sparkles, BookOpen, ExternalLink, Terminal, FileText, Sliders } from 'lucide-react';
import { sound } from '../../utils/audio';
import { HardwareSimulator } from '../Simulator/HardwareSimulator';

interface FlutterHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlutterHubModal: React.FC<FlutterHubModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'mainLayout' | 'apiClient' | 'hardwareSimCode' | 'readme' | 'interview'>('simulator');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const codeMainLayoutDart = `import 'package:flutter/material.dart';
import 'api_client.dart';
import 'hardware_simulator.dart';

class DigitalYantraApp extends StatelessWidget {
  const DigitalYantraApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'The Digital Yantra',
      theme: ThemeData(scaffoldBackgroundColor: const Color(0xFFF7F4EB)),
      home: const YantraStoryScreen(),
    );
  }
}

class YantraStoryScreen extends StatefulWidget {
  const YantraStoryScreen({Key? key}) : super(key: key);

  @override
  State<YantraStoryScreen> createState() => _YantraStoryScreenState();
}

class _YantraStoryScreenState extends State<YantraStoryScreen> {
  final YantraApiClient _apiClient = YantraApiClient();
  late Future<HardwareStoryModel> _storyFuture;

  @override
  void initState() {
    super.initState();
    _storyFuture = _apiClient.fetchEngineeringStory(
      deviceName: "Pixel 9 Pro Archetype",
      formFactor: "Monolithic Chamfered Slab",
      cameraSpecs: "Triple-Lens Visor Assembly (Periscope Telephoto)",
      pcbDetails: "Multi-layer High-Density Circuit Path Grid",
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: FutureBuilder<HardwareStoryModel>(
          future: _storyFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator(color: Color(0xFF00A8B5)));
            } else if (snapshot.hasError) {
              return Center(child: Text("Error: \${snapshot.error}"));
            }

            final data = snapshot.data!;

            return SingleChildScrollView(
              padding: const EdgeInsets.symmetric(vertical: 32.0, horizontal: 16.0),
              child: Center(
                child: Container(
                  constraints: const BoxConstraints(maxWidth: 900),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        data.projectTitle.toUpperCase(),
                        style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Color(0xFF1E242B), letterSpacing: 2.0),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        "An Engineering Visual Novel Powered by Google AI Studio",
                        style: TextStyle(fontSize: 14, fontFamily: 'RobotoMono', color: Color(0xFF00A8B5)),
                      ),
                      const Padding(
                        padding: EdgeInsets.symmetric(vertical: 16.0),
                        child: Divider(color: Color(0xFFD4AF37), thickness: 2),
                      ),
                      const HardwareSimulator(),
                      const SizedBox(height: 32),
                      _buildNarrativeCard(
                        title: data.frame1['title'] ?? 'FRAME 01',
                        subtitle: "THE GEOMETRIC PARADIGM",
                        body: data.frame1['philosophical_grounding'] ?? '',
                        metaList: List<String>.from(data.frame1['talamana_grid_parameters'] ?? []),
                        borderColor: const Color(0xFFD4AF37),
                      ),
                      _buildNarrativeCard(
                        title: data.frame2['title'] ?? 'FRAME 02',
                        subtitle: "INTERNAL ARCHITECTURE",
                        body: "\${data.frame2['optical_subsystem_analysis']}\\n\\n\${data.frame2['digital_yantra_pcb_layout']}\\n\\n\${data.frame2['mechanical_tolerances_and_thermals']}",
                        metaList: [],
                        borderColor: const Color(0xFF00A8B5),
                      ),
                      _buildNarrativeCard(
                        title: data.frame3['title'] ?? 'FRAME 03',
                        subtitle: "THE PHYSICAL OBJECT",
                        body: "\${data.frame3['material_harmony_description']}\\n\\n\${data.frame3['synthesis_summary']}",
                        metaList: [],
                        borderColor: const Color(0xFF1E242B),
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildNarrativeCard({
    required String title,
    required String subtitle,
    required String body,
    required List<String> metaList,
    required Color borderColor,
  }) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(bottom: 24.0),
      padding: const EdgeInsets.all(24.0),
      decoration: BoxDecoration(
        color: const Color(0xFFF7F4EB),
        border: Border(left: BorderSide(color: borderColor, width: 5)),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF1E242B).withOpacity(0.04),
            blurRadius: 8,
            offset: const Offset(0, 4),
          )
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF1E242B))),
          Text(subtitle, style: const TextStyle(fontSize: 11, fontFamily: 'RobotoMono', color: Colors.grey)),
          const SizedBox(height: 12),
          Text(body, style: const TextStyle(fontSize: 14, height: 1.6, color: Color(0xFF1E242B))),
          if (metaList.isNotEmpty) ...[
            const SizedBox(height: 16),
            ...metaList.map((item) => Padding(
                  padding: const EdgeInsets.only(bottom: 4.0),
                  child: Text("• \$item", style: const TextStyle(fontSize: 12, fontFamily: 'RobotoMono', color: Color(0xFF00A8B5))),
                )),
          ]
        ],
      ),
    );
  }
}`;

  const codeApiClientDart = `import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiConfig {
  static const String liveBaseUrl = "https://onrender.com";
  static const bool useMockData = true;
}

class HardwareStoryModel {
  final String projectTitle;
  final Map<String, dynamic> frame1;
  final Map<String, dynamic> frame2;
  final Map<String, dynamic> frame3;

  HardwareStoryModel({
    required this.projectTitle,
    required this.frame1,
    required this.frame2,
    required this.frame3,
  });

  factory HardwareStoryModel.fromJson(Map<String, dynamic> json) {
    return HardwareStoryModel(
      projectTitle: json['project_title'] ?? 'The Digital Yantra',
      frame1: json['frame_1_concept_tier'] ?? {},
      frame2: json['frame_2_engineering_tier'] ?? {},
      frame3: json['frame_3_monolith_tier'] ?? {},
    );
  }
}

class YantraApiClient {
  final http.Client _client = http.Client();

  Future<HardwareStoryModel> fetchEngineeringStory({
    required String deviceName,
    required String formFactor,
    required String cameraSpecs,
    required String pcbDetails,
  }) async {
    if (ApiConfig.useMockData) {
      await Future.delayed(const Duration(milliseconds: 800));
      return HardwareStoryModel.fromJson(_getMockJsonPayload(deviceName));
    }

    final Uri url = Uri.parse("\${ApiConfig.liveBaseUrl}/generate-story");
    try {
      final response = await _client.post(
        url,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "device_name": deviceName,
          "form_factor": formFactor,
          "camera_specs": cameraSpecs,
          "pcb_details": pcbDetails,
        }),
      );

      if (response.statusCode == 200) {
        return HardwareStoryModel.fromJson(jsonDecode(response.body));
      } else {
        throw Exception("Server Error Status Code: \${response.statusCode}");
      }
    } catch (networkError) {
      return HardwareStoryModel.fromJson(_getMockJsonPayload("\$deviceName (Cloud Fallback)"));
    }
  }

  Map<String, dynamic> _getMockJsonPayload(String name) {
    return {
      "project_title": "The Digital Yantra: \$name Architecture",
      "frame_1_concept_tier": {
        "title": "FRAME 01 // THE TALAMANA GENESIS",
        "talamana_grid_parameters": [
          "Visor Axis Constraint: X=162.5mm, Y=76.6mm",
          "Radius Curvature Profile: R=12.4mm",
          "Aspect Ratio Mapping: 19.5:9 Invariant Grid"
        ],
        "philosophical_grounding": "The design does not begin with metal casting; it is birthed inside an invariant parametric grid, directly echoing the iconometric proportions defined by classical historical treatises."
      },
      "frame_2_engineering_tier": {
        "title": "FRAME 02 // YANTRA DECONSTRUCTION",
        "optical_subsystem_analysis": "The camera assembly isolates precision glass lenses along a rigid focal path, converging light data seamlessly onto the imaging sensor plane.",
        "digital_yantra_pcb_layout": "The multi-layered logic board acts as a micro-digital yantra. Copper bus traces route high-frequency electrical currents along highly optimized paths.",
        "mechanical_tolerances_and_thermals": "Vapor-chamber liquid cooling loops dissipate structural thermal signatures evenly across the frame."
      },
      "frame_3_monolith_tier": {
        "title": "FRAME 03 // THE POLISHED PRATIMA",
        "material_harmony_description": "The layers converge. The aluminum perimeter bands lock seamlessly into the frosted matte back glass, producing a smooth surface layout free from structural imbalance.",
        "synthesis_summary": "Mathematical grids from Tier 1 and internal sub-assemblies from Tier 2 solidify into a functional, tactile consumer monolith."
      }
    };
  }
}`;

  const codeHardwareSimulatorDart = `import 'package:flutter/material.dart';
import 'dart:math' as math;

// --- Global Tokens for the Portfolio Site ---
class YantraTokens {
  static const Color parchmentBg = Color(0xFFF7F4EB);
  static const Color structuralInk = Color(0xFF1E242B);
  static const Color geometricGold = Color(0xFFD4AF37);
  static const Color blueprintCyan = Color(0xFF00A8B5);
}

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

  // Helper method to construct clean parameter slider rows
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

// --- Custom Vector Painter representing the Canvas Render ---
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
    
    // Setup Paint Styles
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

    // 2. Render Outer Chassis Geometry (Fades/Shifts when exploded)
    final double mainWidth = 120.0;
    final double mainHeight = 220.0;
    
    // Shift outer chassis outward dynamically based on explosion state
    double chassisOffset = explosionFactor * 40.0;
    
    RRect outerChassis = RRect.fromRectAndRadius(
      Rect.fromCenter(center: Offset(center.dx, center.dy + chassisOffset), width: mainWidth, height: mainHeight),
      Radius.circular(chassisRadius),
    );
    canvas.drawRRect(outerChassis, hardwarePaint);

    // 3. Render Internal Digital Yantra (PCB Tracks Layer)
    if (showTracks) {
      double pcbOffset = explosionFactor * -10.0; // Floats slightly upward on expansion
      final pcbRect = Rect.fromCenter(center: Offset(center.dx, center.dy + pcbOffset), width: mainWidth - 16, height: mainHeight - 50);
      
      // Draw simulated algorithmic circuits inside the board zone
      canvas.drawRect(pcbRect, blueprintPaint);
      for (int i = 0; i < 4; i++) {
        double innerStep = i * 15.0;
        canvas.drawCircle(Offset(center.dx - 20 + innerStep, center.dy + pcbOffset), 8 + innerStep, goldPaint);
      }
    }

    // 4. Render Dynamic Camera Visor Module Layer
    // Shifting visor array significantly upwards on the Y-Axis during an exploded view gesture
    double visorOffset = explosionFactor * -60.0; 
    
    RRect cameraVisor = RRect.fromRectAndRadius(
      Rect.fromCenter(
        center: Offset(center.dx, center.dy - (mainHeight / 3) + visorOffset), 
        width: mainWidth - 8, 
        height: visorThickness
      ),
      const Radius.circular(8.0),
    );
    
    // Render the physical frame and the triple-lens array circles
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
}`;

  const codeMockClientDart = `// --- Mock API Client demonstrating handling parsed backend data payloads ---
import 'dart:convert';
import 'package:flutter/foundation.dart';

class DigitalYantraPayload {
  final String projectTitle;
  final ConceptTier conceptTier;
  final EngineeringTier engineeringTier;
  final MonolithTier monolithTier;

  DigitalYantraPayload({
    required this.projectTitle,
    required this.conceptTier,
    required this.engineeringTier,
    required this.monolithTier,
  });

  factory DigitalYantraPayload.fromJson(Map<String, dynamic> json) {
    return DigitalYantraPayload(
      projectTitle: json['project_title'] ?? '',
      conceptTier: ConceptTier.fromJson(json['frame_1_concept_tier'] ?? {}),
      engineeringTier: EngineeringTier.fromJson(json['frame_2_engineering_tier'] ?? {}),
      monolithTier: MonolithTier.fromJson(json['frame_3_monolith_tier'] ?? {}),
    );
  }
}

class ConceptTier {
  final String title;
  final List<String> parameters;
  final String philosophy;
  final String vectorDescent;

  ConceptTier({required this.title, required this.parameters, required this.philosophy, required this.vectorDescent});

  factory ConceptTier.fromJson(Map<String, dynamic> json) => ConceptTier(
    title: json['title'] ?? '',
    parameters: List<String>.from(json['talamana_grid_parameters'] ?? []),
    philosophy: json['philosophical_grounding'] ?? '',
    vectorDescent: json['vector_descent_description'] ?? '',
  );
}

class EngineeringTier {
  final String title;
  final String opticsAnalysis;
  final String pcbLayout;
  final String thermals;

  EngineeringTier({required this.title, required this.opticsAnalysis, required this.pcbLayout, required this.thermals});

  factory EngineeringTier.fromJson(Map<String, dynamic> json) => EngineeringTier(
    title: json['title'] ?? '',
    opticsAnalysis: json['optical_subsystem_analysis'] ?? '',
    pcbLayout: json['digital_yantra_pcb_layout'] ?? '',
    thermals: json['mechanical_tolerances_and_thermals'] ?? '',
  );
}

class MonolithTier {
  final String title;
  final String materialHarmony;
  final String synthesisSummary;

  MonolithTier({required this.title, required this.materialHarmony, required this.synthesisSummary});

  factory MonolithTier.fromJson(Map<String, dynamic> json) => MonolithTier(
    title: json['title'] ?? '',
    materialHarmony: json['material_harmony_description'] ?? '',
    synthesisSummary: json['synthesis_summary'] ?? '',
  );
}

// Mock Client Simulation for Recruiters
class MockYantraApiClient {
  static Future<DigitalYantraPayload> fetchSampleHardware({Duration delay = const Duration(milliseconds: 600)}) async {
    await Future.delayed(delay);
    const mockJson = '''
    {
      "project_title": "The Digital Yantra: Flagship Smartphone Monolith",
      "frame_1_concept_tier": {
        "title": "FRAME 01 // THE TALAMANA GENESIS",
        "talamana_grid_parameters": [
          "Aspect Ratio: 19.5:9 Root-Rectangle",
          "Brahmasutra Datum: Central vertical optical meridian",
          "Visor Pediment Arc: 24mm radius",
          "Harmonic Division: 8-Fold Ashtanga radial symmetry"
        ],
        "philosophical_grounding": "No form manifests by chance. Before silicon is etched, the device exists purely as mathematical truth.",
        "vector_descent_description": "Grid lines expand and constrict under parametric tension."
      },
      "frame_2_engineering_tier": {
        "title": "FRAME 02 // YANTRA DECONSTRUCTION",
        "optical_subsystem_analysis": "Seven precision-molded aspherical elements refract incoming rays onto the 50MP sensor.",
        "digital_yantra_pcb_layout": "12-layer HDI copper conductive tracks bending at 45° angles.",
        "mechanical_tolerances_and_thermals": "0.4mm sintered copper vapor chamber with phase-change dissipation."
      },
      "frame_3_monolith_tier": {
        "title": "FRAME 03 // THE POLISHED PRATIMA",
        "material_harmony_description": "Forged aerospace 7000-series aluminum, satin camera visor, and frosted matte glass.",
        "synthesis_summary": "98.4% Talamana Divine Harmony Index with hermetic IP68 submersion sealing."
      }
    }
    ''';
    return DigitalYantraPayload.fromJson(jsonDecode(mockJson));
  }
}`;

  const codeReadmeMd = `# 📜 The Digital Yantra: An Engineering Graphic Novel
> **Mapping Flagship Hardware via Sacred Geometry and Google AI Studio**

## 🧭 Executive Summary
**The Digital Yantra** is an interactive, multi-modal engineering graphic novel application bridging modern systems engineering (CAD, circuit schematics, optical ray-tracing) with classical Indian iconometry (**Talamana Padhati** / **Chitrasutra**).

Built using **Google AI Studio Foundation Models (Gemini)**, the application converts complex technical documentation into a tripartite scroll narrative:
1. **The Parametric Genesis** (Root Mandala Grids & Mathematical Constraints)
2. **The Exploded Assembly Chamber** (Aspherical Optics & Digital Yantra PCB)
3. **The Monolithic Resolution** (Polished Pratima Hardware Monolith)

---

## 🛠️ System Architecture

\`\`\`
[ CAD / PCB / Blueprint ] ➔ [ Google AI Studio (Gemini) ] ➔ [ Tripartite Graphic Novel UI ]
                                ├─ Vision API (Anatomy Parsing)
                                └─ Chat API (Shilpin Architecture Agent)
\`\`\`

### 1. Google AI Studio System Prompt
The \`Shilpin Architecture Agent\` enforces strict mapping:
- **Phase 1 (Concept)**: Map to "Talamana Grid" / "Mandala".
- **Phase 2 (Exploded Anatomy)**: Map to "Yantra Deconstruction".
- **Phase 3 (Monolith)**: Map to "Polished Murti" / "Pratima".

### 2. Structured Outputs JSON Schema
Enforces typed output:
- \`project_title\`
- \`frame_1_concept_tier\`
- \`frame_2_engineering_tier\`
- \`frame_3_monolith_tier\`

---

## 🚀 Running the Project

### Web Stack (React + Vite + Express)
\`\`\`bash
# 1. Install dependencies
npm install

# 2. Add Gemini API Key to environment
cp .env.example .env
# Set GEMINI_API_KEY="YOUR_KEY"

# 3. Start development server
npm run dev
# Server running at http://localhost:3000
\`\`\`

### Mobile Stack (Flutter)
\`\`\`bash
# 1. Get Flutter packages
flutter pub get

# 2. Run on Chrome or Mobile Emulator
flutter run -d chrome
\`\`\`

---

## 🎨 Global Design Tokens (\`YantraTokens\`)
- \`parchmentBg\`: \`0xFFF7F4EB\`
- \`structuralInk\`: \`0xFF1E242B\`
- \`geometricGold\`: \`0xFFD4AF37\`
- \`blueprintCyan\`: \`0xFF00A8B5\`

---

## 📄 License
Apache-2.0 · Open Source Engineering Blueprint Showcase
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-5xl bg-[#FAF4E6] border-2 border-[#8C6D3B] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#23180F] text-[#FFF8E7] flex items-center justify-between border-b border-[#8C6D3B]/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00A8B5] flex items-center justify-center text-white border border-[#D4AF37]">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-sm sm:text-base tracking-wider text-[#F4EDE0]">
                  Flutter Cross-Platform Architecture Hub
                </h3>
                <span className="text-[10px] font-technical px-2 py-0.5 rounded bg-[#00A8B5] text-white font-bold">
                  SIMULATOR + RECRUITER SUITE
                </span>
              </div>
              <p className="text-[11px] font-serif-prose italic text-[#CBB89A]">
                hardware_simulator.dart · CustomPainter Vector Canvas · Mock API Client
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#CBB89A] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls Bar */}
        <div className="px-5 py-2.5 bg-[#1C1713] border-b border-[#3D3021] flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1 overflow-x-auto text-xs font-technical">
            {[
              { id: 'simulator', label: '1. Live Vector Simulation (React & Canvas)' },
              { id: 'mainLayout', label: '2. main_layout.dart (App Shell)' },
              { id: 'apiClient', label: '3. api_client.dart (Live/Mock Client)' },
              { id: 'hardwareSimCode', label: '4. hardware_simulator.dart' },
              { id: 'readme', label: '5. GitHub README & Portfolio Specs' },
              { id: 'interview', label: '6. Architectural Defense Q&A' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#00A8B5] text-white font-bold shadow'
                    : 'text-[#C7B79D] hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab !== 'simulator' && activeTab !== 'interview' && (
            <button
              onClick={() => {
                const codeMap: Record<string, string> = {
                  mainLayout: codeMainLayoutDart,
                  apiClient: codeApiClientDart,
                  hardwareSimCode: codeHardwareSimulatorDart,
                  readme: codeReadmeMd,
                };
                copyToClipboard(codeMap[activeTab] || '', activeTab);
              }}
              className="px-3 py-1 bg-[#D4AF37] hover:bg-[#E5C148] text-[#1E242B] rounded text-xs font-technical font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {copiedKey === activeTab ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === activeTab ? 'Copied to Clipboard' : 'Copy Code'}</span>
            </button>
          )}
        </div>

        {/* Main Workspace Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FDFBF7]">
          {/* TAB 1: LIVE INTERACTIVE VECTOR SIMULATION */}
          {activeTab === 'simulator' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#EFECE5] rounded border border-[#C8BFA9] text-xs font-technical flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#1E242B] block">
                    Interactive Recruiter Sandbox (Live BlueprintCanvasPainter)
                  </span>
                  <span className="text-[#645642]">
                    Tweak the Camera Visor Scale, Chassis Curvature, and Exploded Anatomy Split to watch the mathematical grid re-render at 60 FPS.
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-[11px] text-[#1E242B] font-semibold">Active Vector Pipeline</span>
                </div>
              </div>

              {/* Render the full interactive component */}
              <HardwareSimulator />
            </div>
          )}

          {/* TAB 2: main_layout.dart */}
          {activeTab === 'mainLayout' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-technical">
                <span className="font-bold text-[#8C3A27] uppercase">lib/main_layout.dart</span>
                <span className="text-[#645642]">Complete App Shell with Dynamic Narrative Scroll View</span>
              </div>
              <pre className="p-4 bg-[#1E242B] text-[#F7F4EB] rounded border border-[#374151] font-mono text-xs leading-relaxed overflow-x-auto max-h-[550px]">
                {codeMainLayoutDart}
              </pre>
            </div>
          )}

          {/* TAB 3: api_client.dart */}
          {activeTab === 'apiClient' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-technical">
                <span className="font-bold text-[#8C3A27] uppercase">lib/api_client.dart</span>
                <span className="text-[#645642]">Resilient Live/Mock Client for 100% Recruiter Uptime</span>
              </div>
              <pre className="p-4 bg-[#1E242B] text-[#A5B4FC] rounded border border-[#374151] font-mono text-xs leading-relaxed overflow-x-auto max-h-[550px]">
                {codeApiClientDart}
              </pre>
            </div>
          )}

          {/* TAB 4: hardware_simulator.dart */}
          {activeTab === 'hardwareSimCode' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-technical">
                <span className="font-bold text-[#8C3A27] uppercase">lib/hardware_simulator.dart</span>
                <span className="text-[#645642]">StatefulWidget with CustomPainter Vector Canvas</span>
              </div>
              <pre className="p-4 bg-[#1E242B] text-[#F7F4EB] rounded border border-[#374151] font-mono text-xs leading-relaxed overflow-x-auto max-h-[550px]">
                {codeHardwareSimulatorDart}
              </pre>
            </div>
          )}

          {/* TAB 5: GitHub README Template */}
          {activeTab === 'readme' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-technical">
                <span className="font-bold text-[#8C3A27] uppercase">README.md (Portfolio Presentation Template)</span>
                <span className="text-[#645642]">Complete Architectural Documentation for Recruiters</span>
              </div>
              <pre className="p-4 bg-[#1E242B] text-[#86EFAC] rounded border border-[#374151] font-mono text-xs leading-relaxed overflow-x-auto max-h-[550px]">
                {codeReadmeMd}
              </pre>
            </div>
          )}

          {/* TAB 6: ARCHITECTURAL DEFENSE INTERVIEW SCRIPT */}
          {activeTab === 'interview' && (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              <div className="p-4 bg-[#1E242B] text-[#F7F4EB] rounded-lg border border-[#D4AF37]/40 space-y-4 font-mono text-xs">
                <div className="border-b border-[#3D3021] pb-2 flex items-center justify-between">
                  <span className="text-[#00A8B5] font-bold text-sm">
                    MOCK ARCHITECTURAL DEFENSE // TECHNICAL REVIEW TRANSCRIPT
                  </span>
                  <span className="text-[10px] text-[#D4AF37]">SYSTEM DESIGN LEAD Q&A</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-[#2A3441] p-3 rounded border-l-4 border-[#00A8B5]">
                    <span className="text-[#00A8B5] font-bold block mb-1">INTERVIEWER (System Design Lead):</span>
                    <p className="text-[#E2E8F0] leading-relaxed">
                      "I like the visual approach of The Digital Yantra. But looking at your architecture, you chose to use an LLM (Gemini 3.8 Flash / 1.5 Pro) to handle structured engineering parameters. In production hardware pipelines, text variations can break UI components. How do you prevent the AI from hallucinating or changing your data schemas?"
                    </p>
                  </div>

                  <div className="bg-[#1C232B] p-3 rounded border-l-4 border-[#D4AF37]">
                    <span className="text-[#D4AF37] font-bold block mb-1">CANDIDATE (You):</span>
                    <p className="text-[#F7F4EB] leading-relaxed">
                      "That was the primary constraint when designing the backend. I completely bypassed standard conversational text outputs by using Google AI Studio’s <strong>Structured Outputs feature with a strict JSON Schema</strong>. The model cannot reply with free-form markdown or chat filler. If the ingested CAD metadata or hardware constraints don't perfectly map to the schema properties (like <code className="text-[#00A8B5]">talamana_grid_parameters</code> or <code className="text-[#00A8B5]">optical_subsystem_analysis</code>), the generation fails deterministically at the API layer. This ensures the Flutter UI always receives structured, parseable data."
                    </p>
                  </div>

                  <div className="bg-[#2A3441] p-3 rounded border-l-4 border-[#00A8B5]">
                    <span className="text-[#00A8B5] font-bold block mb-1">INTERVIEWER:</span>
                    <p className="text-[#E2E8F0] leading-relaxed">
                      "Fair enough. Let's move to the frontend. You have a CustomPainter vector simulation redrawing in real-time as the user moves sliders. If a recruiter opens this on a low-end mobile browser via GitHub Pages, how do you keep the frame rate smooth?"
                    </p>
                  </div>

                  <div className="bg-[#1C232B] p-3 rounded border-l-4 border-[#D4AF37]">
                    <span className="text-[#D4AF37] font-bold block mb-1">CANDIDATE:</span>
                    <p className="text-[#F7F4EB] leading-relaxed">
                      "The painter doesn't rely on rendering heavy 3D asset meshes or running costly layout recalculations on the main thread. Instead, it computes direct mathematical vector offsets (<code className="text-[#00A8B5]">Rect</code>, <code className="text-[#00A8B5]">RRect</code>, and <code className="text-[#00A8B5]">drawCircle</code>) bound straight to localized Flutter state variables (<code className="text-[#D4AF37]">_visorThickness</code>, <code className="text-[#D4AF37]">_chassisRadius</code>). By separating the simulation lab layout from the rest of the view tree and leveraging lightweight canvas operations, it maintains a solid <strong>60 FPS</strong> on standard web browsers without needing GPU-heavy WebGL contexts."
                    </p>
                  </div>

                  <div className="bg-[#2A3441] p-3 rounded border-l-4 border-[#00A8B5]">
                    <span className="text-[#00A8B5] font-bold block mb-1">INTERVIEWER:</span>
                    <p className="text-[#E2E8F0] leading-relaxed">
                      "Smart optimization. Now, cloud backend instances on free tiers like Render or Vercel often go to sleep if they haven't received traffic in a while. If a hiring manager clicks your live link and the FastAPI backend takes 30 seconds to wake up, your portfolio looks broken. How did you handle cold starts?"
                    </p>
                  </div>

                  <div className="bg-[#1C232B] p-3 rounded border-l-4 border-[#D4AF37]">
                    <span className="text-[#D4AF37] font-bold block mb-1">CANDIDATE:</span>
                    <p className="text-[#F7F4EB] leading-relaxed">
                      "I implemented a <strong>dual-state networking architecture</strong> via the <code className="text-[#00A8B5]">YantraApiClient</code> class. It features an integrated <code className="text-[#D4AF37]">ApiConfig.useMockData</code> safety switch. For portfolio presentation mode, the frontend intercepts the request and instantly resolves a structured local mock payload matching the production JSON schema with a simulated 800ms network latency. Even if the config is set to live and the Render server times out, the client automatically catches the network exception and smoothly drops back to the local copy. Uptime is 100%, and the recruiter gets a fast, interactive experience without ever seeing a broken loading spinner."
                    </p>
                  </div>

                  <div className="bg-[#2A3441] p-3 rounded border-l-4 border-[#00A8B5]">
                    <span className="text-[#00A8B5] font-bold block mb-1">INTERVIEWER:</span>
                    <p className="text-[#E2E8F0] leading-relaxed">
                      "Excellent. You engineered for the reality of cloud distribution, not just the ideal path."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-[#FAF4E6] border-t border-[#8C6D3B]/40 flex items-center justify-between text-xs font-technical text-[#5A4533] shrink-0">
          <span>HIGH-IMPACT PORTFOLIO RECRUITER SUITE · APACHE 2.0</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1E242B] hover:bg-[#2D3748] text-white rounded font-bold uppercase transition-colors cursor-pointer"
          >
            Close Suite
          </button>
        </div>
      </div>
    </div>
  );
};

