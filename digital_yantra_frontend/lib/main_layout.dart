import 'package:flutter/material.dart';
import 'api_client.dart';             // Imports the client class written previously
import 'hardware_simulator.dart';     // Imports the CustomPainter simulator widget

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
    // Fetch default hardware specifications on boot
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
              return const Center(
                child: CircularProgressIndicator(color: Color(0xFF00A8B5)),
              );
            } else if (snapshot.hasError) {
              return Center(child: Text("Initialization Error: ${snapshot.error}"));
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
                      // --- Executive Portfolio Header ---
                      Text(
                        data.projectTitle.toUpperCase(),
                        style: const TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF1E242B),
                          letterSpacing: 2.0,
                        ),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        "An Engineering Visual Novel Powered by Google AI Studio",
                        style: TextStyle(
                          fontSize: 14,
                          fontFamily: 'RobotoMono',
                          color: Color(0xFF00A8B5),
                        ),
                      ),
                      const Padding(
                        padding: EdgeInsets.symmetric(vertical: 16.0),
                        child: Divider(color: Color(0xFFD4AF37), thickness: 2),
                      ),

                      // --- Interactive Lab Simulation Section ---
                      const HardwareSimulator(),
                      const SizedBox(height: 32),

                      // --- Scroll-Driven Narrative Cards ---
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
                        body: "${data.frame2['optical_subsystem_analysis']}\n\n${data.frame2['digital_yantra_pcb_layout']}\n\n${data.frame2['mechanical_tolerances_and_thermals']}",
                        metaList: [],
                        borderColor: const Color(0xFF00A8B5),
                      ),

                      _buildNarrativeCard(
                        title: data.frame3['title'] ?? 'FRAME 03',
                        subtitle: "THE PHYSICAL OBJECT",
                        body: "${data.frame3['material_harmony_description']}\n\n${data.frame3['synthesis_summary']}",
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

  // Helper template for uniform narrative canvas rendering
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
                  child: Text("• $item", style: const TextStyle(fontSize: 12, fontFamily: 'RobotoMono', color: Color(0xFF00A8B5))),
                )),
          ]
        ],
      ),
    );
  }
}
