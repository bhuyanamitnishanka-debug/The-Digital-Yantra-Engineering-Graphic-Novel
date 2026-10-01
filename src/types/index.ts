export interface StructuredNovelSchema {
  project_title: string;
  frame_1_concept_tier: {
    title: string;
    talamana_grid_parameters: string[];
    philosophical_grounding: string;
    vector_descent_description: string;
  };
  frame_2_engineering_tier: {
    title: string;
    optical_subsystem_analysis: string;
    digital_yantra_pcb_layout: string;
    mechanical_tolerances_and_thermals: string;
  };
  frame_3_monolith_tier: {
    title: string;
    material_harmony_description: string;
    synthesis_summary: string;
  };
}

export interface HardwareComponent {
  id: string;
  name: string;
  category: 'Optics' | 'Logic' | 'Chassis' | 'Thermal' | 'Power';
  talamanaRole: string;
  specs: string;
  philosophicalNote: string;
  xOffset?: number;
  yOffset?: number;
  zExplode: number; // Z-axis displacement in exploded view
}

export interface BlueprintData {
  title: string;
  shilpaClassification: string;
  harmonyScore: number;
  narrative: {
    concept: string;
    anatomy: string;
    monolith: string;
  };
  components: HardwareComponent[];
  structuredData?: StructuredNovelSchema;
}

export interface ParametricSettings {
  visorRadius: number; // 16 to 36 mm
  focalAxis: number; // 24 to 75 mm
  busDensity: number; // 8 to 32 tracks
  symmetryDivisions: number; // 6, 8, 9, 12
  goldenRatioMode: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'shilpin';
  text: string;
  timestamp: string;
  componentRef?: string;
}

