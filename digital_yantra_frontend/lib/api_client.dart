import 'dart:convert';
import 'package:http/http.dart' as http;

/// API Configuration Settings
class ApiConfig {
  static const String liveBaseUrl = "https://onrender.com"; // Swap with your live Render URL
  static const bool useMockData = true; // Set to false to connect to the live FastAPI backend
}

/// Structured Data Model matching our strict Google AI Studio JSON schema
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

/// Enterprise API Client handling seamless live/mock data handshakes
class YantraApiClient {
  final http.Client _client = http.Client();

  Future<HardwareStoryModel> fetchEngineeringStory({
    required String deviceName,
    required String formFactor,
    required String cameraSpecs,
    required String pcbDetails,
  }) async {
    // 1. Check for Active Portfolio Mock Fail-Safe
    if (ApiConfig.useMockData) {
      await Future.delayed(const Duration(milliseconds: 800)); // Simulate realistic network latency
      return HardwareStoryModel.fromJson(_getMockJsonPayload(deviceName));
    }

    // 2. Execute Live Network Transaction to Render Server
    final Uri url = Uri.parse("${ApiConfig.liveBaseUrl}/generate-story");
    
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
        final Map<String, dynamic> cleanData = jsonDecode(response.body);
        return HardwareStoryModel.fromJson(cleanData);
      } else {
        throw Exception("Server Error Status Code: ${response.statusCode}");
      }
    } catch (networkError) {
      // Fallback grace window if live cloud server is sleeping
      return HardwareStoryModel.fromJson(_getMockJsonPayload("$deviceName (Cloud Fallback)"));
    }
  }

  /// Internal local mock data generator to ensure 100% portfolio uptime for recruiters
  Map<String, dynamic> _getMockJsonPayload(String name) {
    return {
      "project_title": "The Digital Yantra: $name Architecture",
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
}
