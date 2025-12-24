import { CompetencyData } from './types';

export const COMPETENCY_DB: CompetencyData = {
  glossary: [
    // --- QUADRANT 1: TECHNIQUES (Models, Learning, Reasoning) ---
    { id: 'transformers', name: 'Transformers', category: 'Techniques', maturity: 'Adopt', description: 'The foundation of modern AI using self-attention mechanisms.', impact: 'Critical', keyTech: 'Attention Is All You Need' },
    { id: 'slms', name: 'Small Language Models (SLMs)', category: 'Techniques', maturity: 'Adopt', description: 'Efficient, high-performance models for edge and privacy-first use.', impact: 'Strategic', keyTech: 'Phi-3, Gemma' },
    { id: 'finetuning', name: 'Finetuning', category: 'Techniques', maturity: 'Adopt', description: 'Adapting pre-trained models to specific domain data.', impact: 'Very High', keyTech: 'PyTorch, Axolotl' },
    { id: 'peft-lora', name: 'PEFT / LoRA', category: 'Techniques', maturity: 'Adopt', description: 'Efficient tuning of a small subset of model parameters.', impact: 'High', keyTech: 'HuggingFace PEFT' },
    { id: 'rlhf', name: 'RLHF (Preference Alignment)', category: 'Techniques', maturity: 'Adopt', description: 'Reinforcement learning from human feedback for safety and intent.', impact: 'Critical' },
    { id: 'dpo', name: 'Direct Preference Opt. (DPO)', category: 'Techniques', maturity: 'Adopt', description: 'Direct optimization of model preferences without reward models.', impact: 'Very High' },
    { id: 'moe', name: 'Mixture of Experts (MoE)', category: 'Techniques', maturity: 'Adopt', description: 'Activating specialized parameter groups for efficiency.', impact: 'Very High', keyTech: 'Mixtral 8x7B' },
    { id: 'quantization', name: 'Quantization & Optimization', category: 'Techniques', maturity: 'Adopt', description: 'Reducing precision to increase inference speed and lower memory.', impact: 'Very High', keyTech: 'GGUF, AWQ' },
    { id: 'semantic-chunking', name: 'Semantic Chunking', category: 'Techniques', maturity: 'Adopt', description: 'Splitting text based on meaning boundaries for RAG.', impact: 'High' },
    { id: 'semantic-similarity', name: 'Semantic Similarity', category: 'Techniques', maturity: 'Adopt', description: 'Mathematical closeness of concepts in vector space.', impact: 'Very High' },
    { id: 'context-window', name: 'Context Window', category: 'Techniques', maturity: 'Adopt', description: 'Total token memory available in a single inference turn.', impact: 'High' },
    { id: 'agentic-rag', name: 'Agentic RAG', category: 'Techniques', maturity: 'Trial', description: 'AI planning and executing multi-step retrieval strategies.', impact: 'Critical', keyTech: 'LangGraph' },
    { id: 'prompt-chaining', name: 'Prompt Chaining', category: 'Techniques', maturity: 'Trial', description: 'Sequencing multiple prompts to solve complex tasks.', impact: 'High' },
    { id: 'knowledge-distillation', name: 'Knowledge Distillation', category: 'Techniques', maturity: 'Trial', description: 'Transferring knowledge from teacher models to student models.', impact: 'High' },
    { id: 'synthetic-data', name: 'Synthetic Data', category: 'Techniques', maturity: 'Trial', description: 'AI-generated training data for low-resource domains.', impact: 'Very High', keyTech: 'Gretel.ai' },
    { id: 'data-distillation', name: 'Data Distillation', category: 'Techniques', maturity: 'Trial', description: 'Compressing datasets into essential representative knowledge.', impact: 'Medium' },
    { id: 'graph-rag', name: 'GraphRAG', category: 'Techniques', maturity: 'Assess', description: 'Retrieval augmented by structured knowledge graphs.', impact: 'High', keyTech: 'Neo4j' },
    { id: 'ai-alignment', name: 'AI Alignment', category: 'Techniques', maturity: 'Assess', description: 'Ensuring model goals match human values and intent.', impact: 'Very High' },
    { id: 'world-models', name: 'World Models', category: 'Techniques', maturity: 'Experimental', description: 'AI internal simulations of physical or logical systems.', impact: 'Strategic' },
    { id: 'liquid-networks', name: 'Liquid Neural Networks', category: 'Techniques', maturity: 'Experimental', description: 'Dynamically adjusting architectures for time-series data.', impact: 'High', keyTech: 'MIT Liquid AI' },
    { id: 'federated-learning', name: 'Federated Learning', category: 'Techniques', maturity: 'Experimental', description: 'Decentralized training without moving raw data.', impact: 'Medium' },
    { id: 'neuro-symbolic-strategy', name: 'Neuro-Symbolic Strategy', category: 'Techniques', maturity: 'Experimental', description: 'Combining neural learning with symbolic logical rules.', impact: 'Very High' },

    // --- QUADRANT 2: PLATFORMS & INFRASTRUCTURE ---
    { id: 'gpu-clusters', name: 'GPU Clusters', category: 'Platforms', maturity: 'Adopt', description: 'Distributed compute for training and heavy inference.', impact: 'Strategic', keyTech: 'NVIDIA H100' },
    { id: 'serving-infra', name: 'Serving Infrastructure', category: 'Platforms', maturity: 'Adopt', description: 'High-throughput model serving layers.', impact: 'Critical', keyTech: 'vLLM, Triton' },
    { id: 'vector-db', name: 'Vector Databases', category: 'Platforms', maturity: 'Adopt', description: 'Specialized storage for high-dimensional semantic vectors.', impact: 'Critical', keyTech: 'Pinecone, Weaviate' },
    { id: 'dist-training', name: 'Distributed Training', category: 'Platforms', maturity: 'Adopt', description: 'Scaling model training across multiple compute nodes.', impact: 'Critical', keyTech: 'DeepSpeed, FSDP' },
    { id: 'inference-opt', name: 'Inference Optimization', category: 'Platforms', maturity: 'Adopt', description: 'Hardware-aware acceleration of model responses.', impact: 'Very High', keyTech: 'FlashAttention' },
    { id: 'inference-latency', name: 'Inference Latency Engineering', category: 'Platforms', maturity: 'Adopt', description: 'Minimizing TTFT and total response time.', impact: 'High' },
    { id: 'real-time-inference-design', name: 'Real-Time Inference Design', category: 'Platforms', maturity: 'Adopt', description: 'Architecting for sub-second user interactions.', impact: 'Very High' },
    { id: 'feature-store', name: 'Feature Store', category: 'Platforms', maturity: 'Trial', description: 'Unified data repository for training and serving features.', impact: 'High', keyTech: 'Tecton' },
    { id: 'llmops', name: 'LLMOps', category: 'Platforms', maturity: 'Trial', description: 'Specialized operational pipelines for LLM lifecycles.', impact: 'Strategic', keyTech: 'LangSmith' },
    { id: 'context-caching', name: 'Context Caching', category: 'Platforms', maturity: 'Trial', description: 'Caching frequent context blocks to lower latency/cost.', impact: 'High' },
    { id: 'depin-compute', name: 'DePIN Compute', category: 'Platforms', maturity: 'Experimental', description: 'Decentralized physical compute networks.', impact: 'High', keyTech: 'Akash, Render' },
    { id: 'quantum-mlops', name: 'Quantum MLOps', category: 'Platforms', maturity: 'Experimental', description: 'Operating hybrid classical-quantum ML workloads.', impact: 'Medium' },

    // --- QUADRANT 3: TOOLS & ARCHITECTURES (Agentic + Systems) ---
    { id: 'rag-core', name: 'RAG (Retrieval-Augmented Generation)', category: 'Tools', maturity: 'Adopt', description: 'Grounding models in external data for accuracy.', impact: 'Very High', keyTech: 'LlamaIndex' },
    { id: 'tool-use', name: 'Tool Use / Function Calling', category: 'Tools', maturity: 'Adopt', description: 'Models interacting with external APIs via structured calls.', impact: 'Critical' },
    { id: 'orch-frameworks', name: 'LLM Orchestration', category: 'Tools', maturity: 'Adopt', description: 'Connecting models, tools, and memory into applications.', impact: 'Very High', keyTech: 'LangChain' },
    { id: 'modular-ai', name: 'Modular AI Architecture', category: 'Tools', maturity: 'Adopt', description: 'Decoupled systems with swappable AI components.', impact: 'High' },
    { id: 'multi-agent-systems', name: 'Multi-Agent Systems', category: 'Tools', maturity: 'Trial', description: 'Specialized agents collaborating on complex tasks.', impact: 'Critical', keyTech: 'CrewAI, AutoGen' },
    { id: 'agentic-loops', name: 'Agentic Loops', category: 'Tools', maturity: 'Trial', description: 'Iterative think-act-observe loops for autonomy.', impact: 'Very High' },
    { id: 'mcp', name: 'MCP (Model Context Protocol)', category: 'Tools', maturity: 'Trial', description: 'Universal tool/data standard for all models.', impact: 'Critical', keyTech: 'Anthropic' },
    { id: 'multi-modal-arch', name: 'Multi-Modal Architecture', category: 'Tools', maturity: 'Trial', description: 'Integrating vision, audio, and text into unified systems.', impact: 'Very High' },

    // --- QUADRANT 4: GOVERNANCE, RISK & OPERATIONS ---
    { id: 'cicd-ct', name: 'CI/CD/CT', category: 'Governance', maturity: 'Adopt', description: 'Continuous training integration for model updates.', impact: 'Critical' },
    { id: 'model-registry', name: 'Model Registry', category: 'Governance', maturity: 'Adopt', description: 'Central hub for model versioning and lineage.', impact: 'Very High', keyTech: 'MLflow' },
    { id: 'monitoring-obs', name: 'Monitoring & Observability', category: 'Governance', maturity: 'Adopt', description: 'Tracking health and semantics in production.', impact: 'Critical' },
    { id: 'data-lineage', name: 'Observability & Lineage', category: 'Governance', maturity: 'Adopt', description: 'Tracking data from raw source to model input.', impact: 'Very High' },
    { id: 'drift-detection', name: 'Drift Detection', category: 'Governance', maturity: 'Adopt', description: 'Detecting when data patterns or concepts shift.', impact: 'Very High' },
    { id: 'experiment-tracking', name: 'Experiment Tracking', category: 'Governance', maturity: 'Adopt', description: 'Logging parameters and metrics for every run.', impact: 'High' },
    { id: 'eval-harness', name: 'Evaluation Harness', category: 'Governance', maturity: 'Adopt', description: 'Automated test suites for AI performance/safety.', impact: 'High', keyTech: 'RAGAS' },
    { id: 'data-versioning', name: 'Data Versioning', category: 'Governance', maturity: 'Adopt', description: 'Immutable snapshots of training/eval datasets.', impact: 'High', keyTech: 'DVC' },
    { id: 'model-governance', name: 'Model Governance', category: 'Governance', maturity: 'Adopt', description: 'Policies for safe and ethical AI deployment.', impact: 'Critical' },
    { id: 'guardrails', name: 'AI Guardrails', category: 'Governance', maturity: 'Adopt', description: 'Real-time filtering of unsafe inputs/outputs.', impact: 'Critical' },
    { id: 'red-teaming', name: 'AI Red Teaming', category: 'Governance', maturity: 'Adopt', description: 'Adversarial testing for model vulnerabilities.', impact: 'Very High' },
    { id: 'eu-ai-act', name: 'Regulation (EU AI Act)', category: 'Governance', maturity: 'Adopt', description: 'Compliance with global AI risk categories.', impact: 'Critical' },
    { id: 'bias-mitigation', name: 'Bias Mitigation', category: 'Governance', maturity: 'Adopt', description: 'Reducing algorithmic discrimination in outputs.', impact: 'High' },
    { id: 'xai', name: 'Explainability (XAI)', category: 'Governance', maturity: 'Adopt', description: 'Interpreting how models reach specific conclusions.', impact: 'High' },
    { id: 'hitl', name: 'Human-in-the-loop (HITL)', category: 'Governance', maturity: 'Adopt', description: 'Manual review integrated into automated workflows.', impact: 'Strategic' },
    { id: 'roi-modeling', name: 'AI ROI Modeling', category: 'Governance', maturity: 'Adopt', description: 'Calculating business value vs. compute cost.', impact: 'Strategic' },
    { id: 'hallucination-mgmt', name: 'Hallucination Management', category: 'Governance', maturity: 'Adopt', description: 'Methods to detect and prevent model hallucinations.', impact: 'High' },
    { id: 'data-leakage-prev', name: 'Data Leakage Prevention', category: 'Governance', maturity: 'Adopt', description: 'Ensuring test data doesn\'t contaminate training.', impact: 'Critical' },
    { id: 'model-drift-adopt', name: 'Model Drift', category: 'Governance', maturity: 'Adopt', description: 'Monitoring for accuracy decay in live environments.', impact: 'Strategic' },
    { id: 'fitting', name: 'Overfitting / Underfitting', category: 'Governance', maturity: 'Adopt', description: 'Managing model generalization vs. memorization.', impact: 'High' },
    { id: 'forgetting', name: 'Catastrophic Forgetting', category: 'Governance', maturity: 'Adopt', description: 'Preventing the loss of old skills during new training.', impact: 'High' },
    { id: 'differential-privacy', name: 'Differential Privacy', category: 'Governance', maturity: 'Trial', description: 'Noise-based privacy protection for datasets.', impact: 'High' },
    { id: 'constitutional-ai', name: 'Constitutional AI', category: 'Governance', maturity: 'Trial', description: 'Alignment via a set of high-level principles.', impact: 'Very High' },
    { id: 'green-ai', name: 'Green AI / Sustainability', category: 'Governance', maturity: 'Assess', description: 'Optimizing carbon footprint and power usage.', impact: 'Medium' },
    { id: 'zk-data-prep', name: 'Zero-Knowledge Data Prep', category: 'Governance', maturity: 'Experimental', description: 'Provable data compliance without revealing raw data.', impact: 'Very High' },
    { id: 'agi-gov', name: 'AGI Governance Frameworks', category: 'Governance', maturity: 'Experimental', description: 'Policies for handling super-intelligent autonomy.', impact: 'Strategic' }
  ]
};

// Satisfy CareerAssistant.tsx which expects RADAR_DATA
export const RADAR_DATA = COMPETENCY_DB;