import { CompetencyData } from './types';

export const COMPETENCY_DB: CompetencyData = {
  glossary: [
    // --- PILLAR: DESIGN (Architecture & Modeling) ---
    { id: 'agentic-rag', name: 'Agentic RAG', category: 'Design', maturity: 'Trial', description: 'AI dynamically plans and executes multi-step retrieval strategies.', impact: 'Critical', keyTech: 'LangGraph, AutoGPT' },
    { id: 'multi-agent', name: 'Multi-Agent Systems', category: 'Design', maturity: 'Trial', description: 'Coordinated specialized agents working together on complex workflows.', impact: 'Critical', keyTech: 'CrewAI, Microsoft Autogen' },
    { id: 'dist-training-strategies', name: 'Distributed Training', category: 'Design', maturity: 'Adopt', description: 'Data vs. Model Parallelism (ZeRO, FSDP) for cluster-scale training.', impact: 'Critical', keyTech: 'PyTorch FSDP, DeepSpeed' },
    { id: 'orch-frameworks', name: 'LLM Orchestration', category: 'Design', maturity: 'Adopt', description: 'Frameworks (LangChain, LlamaIndex) for RAG and tool integration.', impact: 'Very High', keyTech: 'LangChain, LlamaIndex' },
    { id: 'rag', name: 'RAG (Retrieval-Augmented Gen)', category: 'Design', maturity: 'Adopt', description: 'Grounding AI in external knowledge to ensure factual accuracy.', impact: 'Very High', keyTech: 'Pinecone, Weaviate' },
    { id: 'graph-rag', name: 'GraphRAG', category: 'Design', maturity: 'Assess', description: 'RAG powered by Knowledge Graphs for deep entity relationship mapping.', impact: 'High', keyTech: 'Neo4j, FalkorDB' },
    { id: 'prompt-chaining', name: 'Prompt Chaining', category: 'Design', maturity: 'Adopt', description: 'Breaking complex tasks into a sequence of smaller, verifiable prompts.', impact: 'High' },
    { id: 'tool-use', name: 'Tool Use / Function Calling', category: 'Design', maturity: 'Adopt', description: 'Models generating structured API arguments to act in the real world.', impact: 'Critical', keyTech: 'JSON Schema, OpenAI Tools' },
    { id: 'modular-ai', name: 'Modular AI Architecture', category: 'Design', maturity: 'Adopt', description: 'Swappable system components (Memory, Tools, Logic) vs. Monoliths.', impact: 'High' },
    { id: 'moe', name: 'Mixture of Experts (MoE)', category: 'Design', maturity: 'Adopt', description: 'Activating only a fraction of parameters for fast inference.', impact: 'Very High', keyTech: 'Mistral, Mixtral 8x7B' },
    { id: 'finetuning', name: 'Finetuning', category: 'Design', maturity: 'Adopt', description: 'Domain-specific training to adapt general models to niche data.', impact: 'Very High', keyTech: 'QLoRA, Axolotl' },
    { id: 'peft-lora-adv', name: 'PEFT / LoRA', category: 'Design', maturity: 'Adopt', description: 'Highly efficient tuning of a tiny fraction of model parameters.', impact: 'High', keyTech: 'HuggingFace PEFT' },
    { id: 'world-models', name: 'World Models', category: 'Design', maturity: 'Experimental', description: 'Simulation-based reasoning where AI builds internal physical or logical worlds.', impact: 'Strategic', keyTech: 'Wayve, Sora' },
    { id: 'liquid-networks', name: 'Liquid Neural Networks', category: 'Design', maturity: 'Experimental', description: 'Dynamic architectures that adjust their underlying equations in real-time.', impact: 'High', keyTech: 'MIT CSAIL Liquid' },

    // --- PILLAR: DELIVERY (Ops & Infrastructure) ---
    { id: 'cicd-ct', name: 'CI/CD/CT', category: 'Delivery', maturity: 'Adopt', description: 'Continuous Integration, Deployment, and Training for model lifecycles.', impact: 'Critical', keyTech: 'GitHub Actions, Kubeflow' },
    { id: 'llmops', name: 'LLMOps', category: 'Delivery', maturity: 'Trial', description: 'Specialized ops focusing on prompts, vector DBs, and LLM life cycles.', impact: 'Strategic', keyTech: 'LangSmith, Weights & Biases' },
    { id: 'serving-infra', name: 'Serving Infrastructure', category: 'Delivery', maturity: 'Adopt', description: 'Compute layers (vLLM, Triton) optimized for high-throughput inference.', impact: 'Critical', keyTech: 'vLLM, NVIDIA Triton' },
    { id: 'vector-db', name: 'Vector Databases', category: 'Delivery', maturity: 'Adopt', description: 'Specialized memory for storing/searching high-dimensional data.', impact: 'Critical', keyTech: 'Pinecone, Milvus' },
    { id: 'gpu-clusters', name: 'GPU Clusters', category: 'Delivery', maturity: 'Adopt', description: 'Networks of interconnected GPUs required for training/inference.', impact: 'Strategic', keyTech: 'NVIDIA H100, InfiniBand' },
    { id: 'context-caching', name: 'Context Caching', category: 'Delivery', maturity: 'Trial', description: 'Storing pre-computed context bits to lower costs and latency.', impact: 'High', keyTech: 'Gemini API Caching' },
    { id: 'inference-latency', name: 'Inference Latency', category: 'Delivery', maturity: 'Adopt', description: 'Total time for model response, critical for user retention.', impact: 'High' },
    { id: 'inference-optimization', name: 'Inference Optimization', category: 'Delivery', maturity: 'Adopt', description: 'Techniques (vLLM, Speculative Decoding) to speed up serving.', impact: 'Very High', keyTech: 'FlashAttention-2' },
    { id: 'real-time-inference-design', name: 'Real-Time Inf. Design', category: 'Delivery', maturity: 'Adopt', description: 'Architecting for sub-100ms latency via caching and cascading.', impact: 'Very High' },
    { id: 'model-registry', name: 'Model Registry', category: 'Delivery', maturity: 'Adopt', description: 'Library for managing model versions, lineage, and deployment stages.', impact: 'Very High', keyTech: 'MLflow Registry' },
    { id: 'feature-store', name: 'Feature Store', category: 'Delivery', maturity: 'Trial', description: 'Centralized repository for reused data features across models.', impact: 'High', keyTech: 'Tecton, Feast' },
    { id: 'quantum-mlops', name: 'Quantum MLOps', category: 'Delivery', maturity: 'Experimental', description: 'Operating hybrid classical-quantum models for combinatorial optimization.', impact: 'Medium', keyTech: 'IBM Quantum, Rigetti' },
    { id: 'depin-compute', name: 'DePIN Compute', category: 'Delivery', maturity: 'Experimental', description: 'Decentralized physical infrastructure for volunteer GPU networks.', impact: 'High', keyTech: 'Render Network, Akash' },

    // --- PILLAR: DATA (Engineering & Concepts) ---
    { id: 'data-observability-lineage', name: 'Observability & Lineage', category: 'Data', maturity: 'Adopt', description: 'Tracking data evolution from source to model input.', impact: 'Very High', keyTech: 'Monte Carlo, OpenLineage' },
    { id: 'synthetic-data', name: 'Synthetic Data', category: 'Data', maturity: 'Trial', description: 'AI-generated data used when real-world data is scarce.', impact: 'Very High', keyTech: 'Gretel.ai, SDV' },
    { id: 'semantic-chunking', name: 'Semantic Chunking', category: 'Data', maturity: 'Adopt', description: 'Breaking docs based on topic boundaries for better retrieval.', impact: 'High' },
    { id: 'data-leakage', name: 'Data Leakage', category: 'Data', maturity: 'Adopt', description: 'Accidental inclusion of testing info in training datasets.', impact: 'Critical' },
    { id: 'hallucination', name: 'Hallucination', category: 'Data', maturity: 'Adopt', description: 'AI delivering confident but factually incorrect information.', impact: 'High' },
    { id: 'model-drift', name: 'Model Drift', category: 'Data', maturity: 'Adopt', description: 'Decay of accuracy due to real-world data pattern changes.', impact: 'Strategic' },
    { id: 'semantic-similarity', name: 'Semantic Similarity', category: 'Data', maturity: 'Adopt', description: 'Measuring concept "closeness" mathematically for retrieval.', impact: 'Very High' },
    { id: 'data-versioning', name: 'Data Versioning', category: 'Data', maturity: 'Adopt', description: 'Snapshots of datasets to ensure reproducibility of model results.', impact: 'High', keyTech: 'DVC, LakeFS' },
    { id: 'data-distillation', name: 'Data Distillation', category: 'Data', maturity: 'Trial', description: 'Compressing datasets into high-quality, essential knowledge.', impact: 'Medium' },
    { id: 'overfitting', name: 'Overfitting', category: 'Data', maturity: 'Adopt', description: 'Model memorizing training data vs. learning underlying logic.', impact: 'High' },
    { id: 'underfitting', name: 'Underfitting', category: 'Data', maturity: 'Adopt', description: 'Model too simple to understand its own training data basics.', impact: 'High' },
    { id: 'zk-data-verification', name: 'Zero-Knowledge Data Prep', category: 'Data', maturity: 'Experimental', description: 'Proving data quality and bias compliance without revealing raw private rows.', impact: 'Very High' },
    { id: 'neuromorphic-data', name: 'Neuromorphic Data Stacks', category: 'Data', maturity: 'Experimental', description: 'Event-based data structures designed for spike-based computation.', impact: 'Medium', keyTech: 'Loihi, Akida' },

    // --- PILLAR: STRATEGY (Governance, Research, Product) ---
    { id: 'slms', name: 'Small Language Models (SLMs)', category: 'Strategy', maturity: 'Adopt', description: 'Highly capable models with smaller parameter counts for edge/on-device privacy and speed.', impact: 'Strategic', keyTech: 'Phi-3, Gemma-2B' },
    { id: 'ai-reg-compliance', name: 'Regulation (EU AI Act)', category: 'Strategy', maturity: 'Adopt', description: 'Navigating global AI laws and the NIST Risk Management Framework.', impact: 'Critical' },
    { id: 'guardrails', name: 'AI Guardrails', category: 'Strategy', maturity: 'Adopt', description: 'Safety firewalls monitoring AI inputs and outputs in real-time.', impact: 'Critical', keyTech: 'NeMo Guardrails' },
    { id: 'red-teaming', name: 'AI Red Teaming', category: 'Strategy', maturity: 'Adopt', description: 'Adversarial testing for vulnerabilities, biases, and safety failures.', impact: 'Very High' },
    { id: 'constitutional-ai', name: 'Constitutional AI', category: 'Strategy', maturity: 'Trial', description: 'Training models to follow a set of high-level safety principles.', impact: 'Very High', keyTech: 'Anthropic Claude' },
    { id: 'ai-alignment', name: 'AI Alignment', category: 'Strategy', maturity: 'Assess', description: 'Ensuring AI goals and behaviors match human intent and values.', impact: 'Very High' },
    { id: 'data-privacy-dp', name: 'Differential Privacy', category: 'Strategy', maturity: 'Trial', description: 'Mathematical noise used to protect individual privacy in datasets.', impact: 'High', keyTech: 'Opacus' },
    { id: 'bias-mitigation', name: 'Bias Mitigation', category: 'Strategy', maturity: 'Adopt', description: 'Identifying and reducing unwanted social biases in AI outputs.', impact: 'High' },
    { id: 'ai-roi-modeling', name: 'AI ROI Modeling', category: 'Strategy', maturity: 'Adopt', description: 'Financial modeling for compute vs. business value return.', impact: 'Strategic' },
    { id: 'green-ai', name: 'Green AI / Sustainability', category: 'Strategy', maturity: 'Assess', description: 'Optimizing carbon footprint and energy usage of AI systems.', impact: 'Medium' },
    { id: 'rlhf', name: 'RLHF (Preference Alignment)', category: 'Strategy', maturity: 'Adopt', description: 'Training AI via human feedback to be helpful and safe.', impact: 'Critical' },
    { id: 'dpo', name: 'Direct Preference Opt. (DPO)', category: 'Strategy', maturity: 'Adopt', description: 'Stable alternative to RLHF for model alignment with human intent.', impact: 'Very High' },
    { id: 'transformers', name: 'Transformers', category: 'Strategy', maturity: 'Adopt', description: 'The core neural network architecture for all modern LLMs.', impact: 'Critical' },
    { id: 'federated-learning', name: 'Federated Learning', category: 'Strategy', maturity: 'Experimental', description: 'Privacy-first training across decentralized devices without data movement.', impact: 'Medium', keyTech: 'Flower, TensorFlow Federated' },
    { id: 'agi-governance', name: 'AGI Governance Frameworks', category: 'Strategy', maturity: 'Experimental', description: 'Policy frameworks for handling self-improving super-intelligent agents.', impact: 'Strategic' },
    { id: 'neuro-symbolic-strat', name: 'Neuro-Symbolic Strategy', category: 'Strategy', maturity: 'Experimental', description: 'Merging probabilistic neural logic with formal symbolic business rules.', impact: 'Very High' },

    // --- MIXED / UNASSIGNED TRANSITIONS ---
    { id: 'mcp', name: 'MCP (Model Context Protocol)', category: 'Design', maturity: 'Trial', description: 'Standard for universal tool/data integration across models.', impact: 'Critical', keyTech: 'Anthropic MCP' },
    { id: 'model-monitoring-obs', name: 'Monitoring & Observability', category: 'Delivery', maturity: 'Adopt', description: 'Tracking semantic health, latency, and accuracy in production.', impact: 'Critical', keyTech: 'Arize Phoenix' },
    { id: 'drift-detection-ops', name: 'Drift Detection', category: 'Delivery', maturity: 'Adopt', description: 'Automated detection of Concept and Data drift in live environments.', impact: 'Very High', keyTech: 'Evidently AI' },
    { id: 'experiment-tracking', name: 'Experiment Tracking', category: 'Delivery', maturity: 'Adopt', description: 'Logging parameters and metrics for every training run.', impact: 'High', keyTech: 'MLflow, Comet' },
    { id: 'eval-harness', name: 'Evaluation Harness', category: 'Delivery', maturity: 'Adopt', description: 'Automated suites to verify model quality before production release.', impact: 'High', keyTech: 'DeepEval, RAGAS' },
    { id: 'model-governance-compliance', name: 'Model Governance', category: 'Strategy', maturity: 'Adopt', description: 'Frameworks ensuring AI is safe, ethical, and legal.', impact: 'Critical' },
    { id: 'multi-modal-arch', name: 'Multi-Modal Arch', category: 'Design', maturity: 'Trial', description: 'Fusion of vision, text, and audio into unified embeddings.', impact: 'Very High', keyTech: 'CLIP, Flamingo' },
    { id: 'knowledge-distillation', name: 'Knowledge Distillation', category: 'Strategy', maturity: 'Trial', description: 'Compressing a "Teacher" model into a smaller, faster "Student" model.', impact: 'High' },
    { id: 'quantization-adv', name: 'Quantization & Opt.', category: 'Design', maturity: 'Adopt', description: '4-bit/8-bit precision reduction for edge deployment.', impact: 'Very High', keyTech: 'GGML, AWQ' },
    { id: 'hitl-design', name: 'Human-in-the-loop (HITL)', category: 'Strategy', maturity: 'Adopt', description: 'Integrating human feedback (RLHF) into AI lifecycles.', impact: 'Strategic' },
    { id: 'context-window', name: 'Context Window', category: 'Data', maturity: 'Adopt', description: 'Memory limit of a model in a single user conversation.', impact: 'High' },
    { id: 'xai', name: 'Explainability (XAI)', category: 'Strategy', maturity: 'Adopt', description: 'Techniques to reveal why AI made a specific decision.', impact: 'High', keyTech: 'SHAP, LIME' },
    { id: 'agent-loops', name: 'Agentic Loops', category: 'Design', maturity: 'Trial', description: 'Iterative Think-Act-Observe cycles for autonomous goals.', impact: 'Very High' },
    { id: 'catastrophic-forgetting', name: 'Catastrophic Forgetting', category: 'Data', maturity: 'Adopt', description: 'AI losing old skills while learning new information.', impact: 'High' }
  ]
};

// Satisfy CareerAssistant.tsx which expects RADAR_DATA
export const RADAR_DATA = COMPETENCY_DB;