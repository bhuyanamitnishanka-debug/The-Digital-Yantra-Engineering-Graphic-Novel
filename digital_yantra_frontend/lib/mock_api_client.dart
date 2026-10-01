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

  ConceptTier({
    required this.title,
    required this.parameters,
    required this.philosophy,
    required this.vectorDescent,
  });

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

  EngineeringTier({
    required this.title,
    required this.opticsAnalysis,
    required this.pcbLayout,
    required this.thermals,
  });

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

  MonolithTier({
    required this.title,
    required this.materialHarmony,
    required this.synthesisSummary,
  });

  factory MonolithTier.fromJson(Map<String, dynamic> json) => MonolithTier(
    title: json['title'] ?? '',
    materialHarmony: json['material_harmony_description'] ?? '',
    synthesisSummary: json['synthesis_summary'] ?? '',
  );
}

class MockYantraApiClient {
  static Future<DigitalYantraPayload> fetchSampleHardware({Duration delay = const Duration(milliseconds: 500)}) async {
    await Future.delayed(delay);
    const mockJson = '''
    {
      "project_title": "The Digital Yantra: Flagship Smartphone Monolith",
      "frame_1_concept_tier": {
        "title": "FRAME 01 // THE TALAMANA GENESIS",
        "talamana_grid_parameters": [
          "Aspect Ratio: 19.5:9 Root-Rectangle (derived from Sulba Sutra cord metrics)",
          "Brahmasutra Datum: Central vertical optical meridian at X=200mm",
          "Visor Pediment Arc: 24mm radius establishing horizontal tactile equilibrium",
          "Harmonic Division: 8-Fold Ashtanga radial symmetry for peripheral sensors"
        ],
        "philosophical_grounding": "No form manifests by chance. Before silicon is etched or metal forged, the device exists purely as mathematical truth. We lay down the root parameters—defining the arc of the camera visor and the focal alignment of the lenses within a strict iconometric grid.",
        "vector_descent_description": "The mathematical grid lines expand and constrict under parametric tension, projecting dimensional constraints downward into physical assembly space."
      },
      "frame_2_engineering_tier": {
        "title": "FRAME 02 // YANTRA DECONSTRUCTION",
        "optical_subsystem_analysis": "Light behaves according to structural law. Seven precision-molded aspherical elements refract incoming ambient rays along a 50mm conic focal axis, converging photons with zero spherical aberration onto the 50MP 1/1.31\" CMOS sensor die.",
        "digital_yantra_pcb_layout": "The modern logic board functions as a digital yantra. These 12-layer HDI copper conductive tracks are designed paths bending at 45-degree angles to route high-frequency electrical energy with zero impedance reflections, echoing the sacred diagonal radials of Vastu Purusha Mandalas.",
        "mechanical_tolerances_and_thermals": "A 0.4mm sintered copper vapor chamber utilizes capillary wick phase-change dissipation, balancing thermodynamic Agni-Soma heat transfer from the 4nm Tensor core symmetrically across the chassis perimeter with ±0.02mm mechanical tolerance."
      },
      "frame_3_monolith_tier": {
        "title": "FRAME 03 // THE POLISHED PRATIMA",
        "material_harmony_description": "The mathematical equations of the top tier have hardened into physical truth. Forged aerospace 7000-series aluminum perimeter bands, a satin-finished camera visor, and frosted matte Gorilla Glass Victus 2 form a balanced, material monolith. The cycle is complete.",
        "synthesis_summary": "Achieves an authenticated 98.4% Talamana Divine Harmony Index with hermetic IP68 submersion sealing, transforming complex micro-assemblies into an unyielding sacred artifact."
      }
    }
    ''';
    return DigitalYantraPayload.fromJson(jsonDecode(mockJson));
  }
}
