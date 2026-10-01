import os
import time
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

app = FastAPI(
    title="The Digital Yantra API",
    description="FastAPI Orchestration Backend for Google AI Studio & Classical Iconometry",
    version="1.0.0",
)

# CORS configuration for Flutter Web and React frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Google GenAI client
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None

# Pydantic Schemas matching the exact JSON blueprint
class Frame1ConceptTier(BaseModel):
    title: str
    talamana_grid_parameters: List[str]
    philosophical_grounding: str
    vector_descent_description: str

class Frame2EngineeringTier(BaseModel):
    title: str
    optical_subsystem_analysis: str
    digital_yantra_pcb_layout: str
    mechanical_tolerances_and_thermals: str

class Frame3MonolithTier(BaseModel):
    title: str
    material_harmony_description: str
    synthesis_summary: str

class DigitalYantraResponse(BaseModel):
    project_title: str
    frame_1_concept_tier: Frame1ConceptTier
    frame_2_engineering_tier: Frame2EngineeringTier
    frame_3_monolith_tier: Frame3MonolithTier

class BlueprintRequest(BaseModel):
    blueprint_type: str = "pixel_flagship"
    custom_directive: Optional[str] = None
    custom_image_base64: Optional[str] = None

# System prompt as specified in the blueprint
SHILPIN_SYSTEM_INSTRUCTION = """You are the "Shilpin Architecture Agent," a highly specialized AI core running inside an interactive engineering graphic novel application. Your purpose is to ingest technical engineering data (schematics, CAD data summaries, or component lists) and translate them into a tripartite, scroll-style narrative that bridges modern systems engineering with classical Indian iconometry (Shilpa Shastras, Talamana padhati, and Yantra design).

CRITICAL DOMAIN MAPPINGS:
- Phase 1 (Concept/Constraints): Map to "Talamana Grid" / "Mandala". Focus on mathematical logic, root grids, constraints, and sacred geometry.
- Phase 2 (Exploded Anatomy): Map to "Yantra Deconstruction". Focus on sub-assemblies, logic boards (digital yantras), optical rays, thermal dissipation paths, and mechanical tolerances.
- Phase 3 (Assembled Monolith): Map to "Polished Murti" / "Pratima". Focus on the final, materialized, tactile form factor, material harmony, and surface finishes.

TONE & STYLE:
Maintain an authoritative, elegant, and academic-yet-accessible tone. Use precise engineering vocabulary combined with traditional architectural terms. Keep structural text crisp, punchy, and highly scannable. Avoid conversational filler. Always respond in the strict JSON format requested by the client application."""

@app.get("/")
@app.get("/health")
@app.get("/api/health")
async def health_check():
    """
    Automated portfolio health check. Verifies the status of the local FastAPI engine 
    and validates real-time connectivity to the Google AI Studio Gemini API layer.
    """
    start_time = time.time()
    gemini_status = "healthy"
    diagnostic_message = "All core systems operating within parametric constraints."
    
    # 1. Verify Local API Key Ingestion
    if not os.environ.get("GEMINI_API_KEY"):
        return {
            "status": "unhealthy",
            "timestamp": time.time(),
            "uptime_seconds": round(time.time() - start_time, 2),
            "services": {
                "fastapi_server": "healthy",
                "google_ai_studio_api": "unconfigured"
            },
            "error": "CRITICAL: GEMINI_API_KEY environment variable is completely missing."
        }

    # 2. Run a Live, Lightweight Connectivity Probe Against Gemini
    try:
        if client:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents="ping",
                config=types.GenerateContentConfig(
                    max_output_tokens=1,
                    temperature=0.0
                )
            )
            if not response.text:
                raise Exception("Empty response token received from Gemini gateway.")
        else:
            raise Exception("GenAI client not initialized.")
            
    except Exception as api_exception:
        gemini_status = "unhealthy"
        diagnostic_message = f"Google AI Studio connectivity breach: {str(api_exception)}"

    return {
        "status": "healthy" if gemini_status == "healthy" else "degraded",
        "timestamp": time.time(),
        "latency_ms": round((time.time() - start_time) * 1000, 2),
        "services": {
            "fastapi_server": "healthy",
            "google_ai_studio_api": gemini_status
        },
        "diagnostics": diagnostic_message
    }

@app.post("/")
@app.post("/api/analyze-blueprint", response_model=DigitalYantraResponse)
def analyze_blueprint(req: BlueprintRequest):
    if not client:
        # High-fidelity fallback if GEMINI_API_KEY is not yet configured locally
        return DigitalYantraResponse(
            project_title="The Digital Yantra: Flagship Smartphone Monolith",
            frame_1_concept_tier=Frame1ConceptTier(
                title="FRAME 01 // THE TALAMANA GENESIS",
                talamana_grid_parameters=[
                    "Aspect Ratio: 19.5:9 Root-Rectangle (derived from Sulba Sutra cord metrics)",
                    "Brahmasutra Datum: Central vertical optical meridian at X=200mm",
                    "Visor Pediment Arc: 24mm radius establishing horizontal tactile equilibrium",
                    "Harmonic Division: 8-Fold Ashtanga radial symmetry for peripheral sensors"
                ],
                philosophical_grounding="No form manifests by chance. Before silicon is etched or metal forged, the device exists purely as mathematical truth. We lay down the root parameters—defining the arc of the camera visor and the focal alignment of the lenses within a strict iconometric grid.",
                vector_descent_description="The mathematical grid lines expand and constrict under parametric tension, projecting dimensional constraints downward into physical assembly space."
            ),
            frame_2_engineering_tier=Frame2EngineeringTier(
                title="FRAME 02 // YANTRA DECONSTRUCTION",
                optical_subsystem_analysis="Light behaves according to structural law. Seven precision-molded aspherical elements refract incoming ambient rays along a 50mm conic focal axis, converging photons with zero spherical aberration onto the 50MP 1/1.31\" CMOS sensor die.",
                digital_yantra_pcb_layout="The modern logic board functions as a digital yantra. These 12-layer HDI copper conductive tracks are designed paths bending at 45-degree angles to route high-frequency electrical energy with zero impedance reflections, echoing the sacred diagonal radials of Vastu Purusha Mandalas.",
                mechanical_tolerances_and_thermals="A 0.4mm sintered copper vapor chamber utilizes capillary wick phase-change dissipation, balancing thermodynamic Agni-Soma heat transfer from the 4nm Tensor core symmetrically across the chassis perimeter with ±0.02mm mechanical tolerance."
            ),
            frame_3_monolith_tier=Frame3MonolithTier(
                title="FRAME 03 // THE POLISHED PRATIMA",
                material_harmony_description="The mathematical equations of the top tier have hardened into physical truth. Forged aerospace 7000-series aluminum perimeter bands, a satin-finished camera visor, and frosted matte Gorilla Glass Victus 2 form a balanced, material monolith. The cycle is complete.",
                synthesis_summary="Achieves an authenticated 98.4% Talamana Divine Harmony Index with hermetic IP68 submersion sealing, transforming complex micro-assemblies into an unyielding sacred artifact."
            )
        )

    try:
        prompt = f"Analyze hardware target '{req.blueprint_type}'. Directive: '{req.custom_directive or 'Perform full tripartite Chitrasutra-to-CAD graphic novel narrative breakdown'}'."
        
        response = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=SHILPIN_SYSTEM_INSTRUCTION,
                response_mime_type="application/json",
                response_schema=DigitalYantraResponse,
            ),
        )
        return DigitalYantraResponse.model_validate_json(response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class StoryRequest(BaseModel):
    device_name: Optional[str] = None
    title: Optional[str] = None
    form_factor: Optional[str] = "19.5:9 Unibody"
    camera_specs: Optional[str] = "7-Element Aspherical 50MP"
    pcb_details: Optional[str] = "12-Layer HDI Yantra"
    visor_thickness: Optional[float] = 24.0
    chassis_radius: Optional[float] = 16.0
    lens_elements: Optional[int] = 7
    hdi_pcb_layers: Optional[int] = 12
    thermal_solution: Optional[str] = None

@app.post("/generate-story", response_model=DigitalYantraResponse)
@app.post("/api/generate-story", response_model=DigitalYantraResponse)
def generate_story(req: StoryRequest):
    target_name = req.device_name or req.title or "Flagship Smartphone Monolith"
    directive_parts = [
        f"Form factor: {req.form_factor}",
        f"Optics: {req.camera_specs or f'{req.lens_elements}-Element Molded Aspheric'}",
        f"PCB Substrate: {req.pcb_details or f'{req.hdi_pcb_layers}-Layer HDI Yantra'}",
    ]
    if req.thermal_solution:
        directive_parts.append(f"Thermal: {req.thermal_solution}")
    if req.visor_thickness:
        directive_parts.append(f"Visor thickness: {req.visor_thickness}mm")

    return analyze_blueprint(
        BlueprintRequest(
            blueprint_type=target_name,
            custom_directive=", ".join(directive_parts),
        )
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
