import 'package:flutter/material.dart';
import 'theme.dart';
import 'hardware_simulator.dart';
import 'api_client.dart';

void main() {
  runApp(const DigitalYantraApp());
}

class DigitalYantraApp extends StatelessWidget {
  const DigitalYantraApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'The Digital Yantra: Engineering Graphic Novel',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: const Color(0xFF110F0D),
        primaryColor: YantraTokens.geometricGold,
        fontFamily: 'Cinzel',
      ),
      home: const DigitalYantraHomePage(),
    );
  }
}

class DigitalYantraHomePage extends StatefulWidget {
  const DigitalYantraHomePage({Key? key}) : super(key: key);

  @override
  State<DigitalYantraHomePage> createState() => _DigitalYantraHomePageState();
}

class _DigitalYantraHomePageState extends State<DigitalYantraHomePage> {
  final YantraApiClient _apiClient = YantraApiClient();
  HardwareStoryModel? _storyModel;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchHardwareStory();
  }

  Future<void> _fetchHardwareStory() async {
    setState(() => _isLoading = true);
    try {
      final data = await _apiClient.fetchEngineeringStory(
        deviceName: "Pixel 9 Pro Monolith",
        formFactor: "19.5:9 Golden Rectangle Unibody",
        cameraSpecs: "7-Element Aspherical 50MP + 5x Folded Periscope",
        pcbDetails: "12-Layer High-Density Interconnect (HDI) Yantra",
      );
      setState(() {
        _storyModel = data;
        _isLoading = false;
      });
    } catch (err) {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF141210),
        elevation: 0,
        title: const Text(
          'THE DIGITAL YANTRA',
          style: TextStyle(
            color: Color(0xFFF4EDE0),
            letterSpacing: 2.0,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh, color: YantraTokens.geometricGold),
            tooltip: 'Reload Hardware Story via API',
            onPressed: _fetchHardwareStory,
          ),
        ],
      ),
      body: _isLoading
          ? const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(color: YantraTokens.geometricGold),
                  SizedBox(height: 16),
                  Text(
                    'Synthesizing Talamana Blueprint via Google AI Studio...',
                    style: TextStyle(color: Color(0xFFC7B79D), fontSize: 13),
                  ),
                ],
              ),
            )
          : SingleChildScrollView(
              padding: const EdgeInsets.symmetric(vertical: 24.0, horizontal: 16.0),
              child: Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 900),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Interactive Vector Simulation Widget (60 FPS CustomPainter)
                      const HardwareSimulator(),
                      const SizedBox(height: 36.0),

                      // Frame 01: Concept Tier
                      _buildTierCard(
                        frameNumber: "01",
                        title: _storyModel?.frame1['title'] ?? 'FRAME 01 // THE TALAMANA GENESIS',
                        subtitle: "Invariant Parametric Root Grids & Coordinate Matrices",
                        narrative: _storyModel?.frame1['philosophical_grounding'] ?? '',
                        details: List<String>.from(_storyModel?.frame1['talamana_grid_parameters'] ?? []),
                        accentColor: YantraTokens.geometricGold,
                      ),
                      const SizedBox(height: 28.0),

                      // Frame 02: Engineering Tier
                      _buildTierCard(
                        frameNumber: "02",
                        title: _storyModel?.frame2['title'] ?? 'FRAME 02 // YANTRA DECONSTRUCTION',
                        subtitle: "7-Element Aspherical Ray-Tracing & Digital Yantra HDI Board",
                        narrative: _storyModel?.frame2['optical_subsystem_analysis'] ?? '',
                        secondaryNarrative: _storyModel?.frame2['digital_yantra_pcb_layout'],
                        tertiaryNarrative: _storyModel?.frame2['mechanical_tolerances_and_thermals'],
                        accentColor: YantraTokens.blueprintCyan,
                      ),
                      const SizedBox(height: 28.0),

                      // Frame 03: Monolith Tier
                      _buildTierCard(
                        frameNumber: "03",
                        title: _storyModel?.frame3['title'] ?? 'FRAME 03 // THE POLISHED PRATIMA',
                        subtitle: "Resolved Physical Form Factor, Aerospace Aluminum, & Glass Harmony",
                        narrative: _storyModel?.frame3['material_harmony_description'] ?? '',
                        secondaryNarrative: _storyModel?.frame3['synthesis_summary'],
                        accentColor: const Color(0xFF8C3A27),
                      ),
                    ],
                  ),
                ),
              ),
            ),
    );
  }

  Widget _buildTierCard({
    required String frameNumber,
    required String title,
    required String subtitle,
    required String narrative,
    String? secondaryNarrative,
    String? tertiaryNarrative,
    List<String>? details,
    required Color accentColor,
  }) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24.0),
      decoration: BoxDecoration(
        color: YantraTokens.parchmentBg,
        borderRadius: BorderRadius.circular(6.0),
        border: Border.all(color: YantraTokens.structuralInk.withOpacity(0.15), width: 1.5),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.2),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: YantraTokens.structuralInk,
                  letterSpacing: 1.5,
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: accentColor.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(4),
                  border: Border.all(color: accentColor.withOpacity(0.4)),
                ),
                child: Text(
                  "TIER $frameNumber",
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color: accentColor,
                    fontFamily: 'RobotoMono',
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 4.0),
          Text(
            subtitle,
            style: const TextStyle(
              fontSize: 11,
              fontFamily: 'RobotoMono',
              color: Color(0xFF645642),
            ),
          ),
          const SizedBox(height: 10.0),
          Divider(color: accentColor, thickness: 2.0),
          const SizedBox(height: 14.0),
          Text(
            narrative,
            style: const TextStyle(
              fontFamily: 'RobotoMono',
              fontSize: 13,
              color: YantraTokens.structuralInk,
              height: 1.6,
            ),
          ),
          if (details != null && details.isNotEmpty) ...[
            const SizedBox(height: 14.0),
            Container(
              padding: const EdgeInsets.all(12.0),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.6),
                borderRadius: BorderRadius.circular(4.0),
                border: Border.all(color: accentColor.withOpacity(0.25)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "CONSTRAINTS & GEOMETRIC MATRICES:",
                    style: TextStyle(
                      fontFamily: 'RobotoMono',
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: YantraTokens.structuralInk,
                      letterSpacing: 1.0,
                    ),
                  ),
                  const SizedBox(height: 8),
                  ...details.map((param) => Padding(
                        padding: const EdgeInsets.only(bottom: 4.0),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("• ", style: TextStyle(color: accentColor, fontWeight: FontWeight.bold)),
                            Expanded(
                              child: Text(
                                param,
                                style: const TextStyle(
                                  fontFamily: 'RobotoMono',
                                  fontSize: 11,
                                  color: Color(0xFF333333),
                                ),
                              ),
                            ),
                          ],
                        ),
                      )),
                ],
              ),
            ),
          ],
          if (secondaryNarrative != null && secondaryNarrative.isNotEmpty) ...[
            const SizedBox(height: 12.0),
            Text(
              secondaryNarrative,
              style: const TextStyle(
                fontFamily: 'RobotoMono',
                fontSize: 12,
                color: Color(0xFF4A3B2C),
                height: 1.5,
              ),
            ),
          ],
          if (tertiaryNarrative != null && tertiaryNarrative.isNotEmpty) ...[
            const SizedBox(height: 10.0),
            Text(
              tertiaryNarrative,
              style: const TextStyle(
                fontFamily: 'RobotoMono',
                fontSize: 12,
                color: Color(0xFF4A3B2C),
                height: 1.5,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
