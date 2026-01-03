
import { CompetencyData } from './types';

// Fixed property 'glossary' is missing in type '{}' error by uncommenting the property
export const COMPETENCY_DB: CompetencyData = {
  glossary: [
    
    { 
      id: 'transformers', 
      name: 'Transformers', 
      category: 'Techniques', 
      maturity: 'Adopt', 
      impact: 'Critical', 
      description: 'The foundation of modern AI using self-attention mechanisms.', 
      keyTech: 'Attention Is All You Need',
      details: "### Definition\nThe Transformer is the foundational architecture of modern AI, replacing RNNs/LSTMs with a parallelizable self-attention mechanism. It allows models to weight the significance of different parts of input data dynamically.\n\n### Application\nIt is the 'compute engine' inside GPT-4, Gemini, and Claude. In enterprise settings, understanding Transformer blocks is critical for debugging context window limits and optimizing inference costs.\n\n### Risks\nQuadratic complexity (O(N²)) means that doubling input text quadruples the compute required. Without attention-optimization (like FlashAttention), long-document processing becomes economically unviable."
    },
    
    { 
      id: 'slms', 
      name: 'Small Language Models (SLMs)', 
      category: 'Techniques', 
      maturity: 'Adopt', 
      impact: 'Strategic', 
      description: 'Efficient, high-performance models for edge and privacy-first use.', 
      keyTech: 'Phi-3, Gemma',
      details: "### Definition\nSmall Language Models (SLMs) are high-efficiency models typically under 10B parameters, trained on curated, high-quality datasets rather than raw web-scrapes.\n\n### Application\nIdeal for edge computing, mobile devices, and high-privacy on-premise deployments where data cannot leave the local network. They provide GPT-3.5 level reasoning at a fraction of the VRAM cost.\n\n### Risks\nNarrower 'world knowledge' compared to frontier models. They are prone to failure on highly abstract or 'out-of-distribution' reasoning tasks."
    },
    { 
      id: 'finetuning', 
      name: 'Finetuning', 
      category: 'Techniques', 
      maturity: 'Adopt', 
      impact: 'Very High', 
      description: 'Adapting pre-trained models to specific domain data.', 
      keyTech: 'PyTorch, Axolotl',
      details: "### Definition\nFinetuning is the process of taking a pre-trained 'base' model and performing additional training on a specialized, smaller dataset to adapt its behavior or knowledge.\n\n### Application\nUsed for aligning a model to a specific corporate brand voice, legal nomenclature, or specialized medical terminology that was under-represented in the original training data.\n\n### Risks\nCatastrophic Forgetting: Over-tuning on specific data can cause the model to lose its general reasoning capabilities or 'forget' basic logic."
    },
    { 
      id: 'peft-lora', 
      name: 'PEFT / LoRA', 
      category: 'Techniques', 
      maturity: 'Adopt', 
      impact: 'High', 
      description: 'Efficient tuning of a small subset of model parameters.', 
      keyTech: 'HuggingFace PEFT',
      details: "### Definition\nParameter-Efficient Fine-Tuning (PEFT), specifically Low-Rank Adaptation (LoRA), freezes the original model weights and only trains a tiny 'adapter' layer (often <1% of the total parameters).\n\n### Application\nAllows enterprises to maintain hundreds of specialized 'expert' models for different tasks (Legal, HR, Code) using a single base-model instance, saving millions in GPU memory.\n\n### Risks\nLoRA adapters may not capture deep semantic changes as effectively as full-weight finetuning for extremely complex domain shifts."
    },
    { 
      id: 'rlhf', 
      name: 'RLHF (Preference Alignment)', 
      category: 'Techniques', 
      maturity: 'Adopt', 
      impact: 'Critical', 
      description: 'Reinforcement learning from human feedback for safety and intent.',
      details: "### Definition\nReinforcement Learning from Human Feedback (RLHF) involves a secondary training phase where human evaluators rank model outputs to create a reward signal.\n\n### Application\nThis is the critical step that turns a raw 'next-token predictor' into a helpful assistant that follows instructions and avoids toxic content.\n\n### Risks\nReward Hacking: The model might learn to produce 'pleasing' but factually incorrect answers if evaluators prioritize tone over truth."
    },
    { 
      id: 'dpo', 
      name: 'Direct Preference Opt. (DPO)', 
      category: 'Techniques', 
      maturity: 'Adopt', 
      impact: 'Very High', 
      description: 'Direct optimization of model preferences without reward models.',
      details: "### Definition\nDirect Preference Optimization (DPO) is a mathematically streamlined alternative to RLHF that optimizes the model policy directly from human preference pairs without needing a separate reward model.\n\n### Application\nUsed to align smaller models efficiently, offering a more stable and less computationally expensive way to implement 'alignment' compared to PPO-based RLHF.\n\n### Risks\nIt can be sensitive to the quality of the preference pairs; noisy data in the preference set can lead to skewed or biased model behaviors."
    },
    { 
      id: 'moe', 
      name: 'Mixture of Experts (MoE)', 
      category: 'Techniques', 
      maturity: 'Adopt', 
      impact: 'Very High', 
      description: 'Activating specialized parameter groups for efficiency.', 
      keyTech: 'Mixtral 8x7B',
      details: "### Definition\nMixture of Experts (MoE) uses a 'routing' layer to only activate a small subset of the model's total parameters for any given token.\n\n### Application\nAllows a model like Mixtral 8x7B to have the power of a 47B parameter model while only using the compute of a 12B parameter model during inference.\n\n### Risks\nDeployment complexity is high; while compute is low, the VRAM requirement remains massive because the entire model (all experts) must usually be loaded into memory."
    },
    { 
      id: 'quantization', 
      name: 'Quantization & Optimization', 
      category: 'Techniques', 
      maturity: 'Adopt', 
      impact: 'Very High', 
      description: 'Reducing precision to increase inference speed and lower memory.', 
      keyTech: 'GGUF, AWQ',
      details: "### Definition\nQuantization is the process of reducing the numerical precision of model weights (e.g., from 16-bit floats to 4-bit integers) to reduce memory and compute.\n\n### Application\nAllows a 70B parameter model that would usually require 140GB of VRAM to run on a single 48GB GPU with minimal loss in reasoning quality.\n\n### Risks\nPrecision Loss: Aggressive quantization (below 4 bits) can significantly degrade the model's ability to handle complex math or subtle logic."
    },
    { 
      id: 'semantic-chunking', 
      name: 'Semantic Chunking', 
      category: 'Techniques', 
      maturity: 'Adopt', 
      impact: 'High', 
      description: 'Splitting text based on meaning boundaries for RAG.',
      details: "### Definition\nSemantic Chunking is a text segmentation technique that uses embeddings or model-based analysis to find natural topic boundaries in a document.\n\n### Application\nUsed in RAG to ensure that retrieved segments contain complete thoughts, avoiding mid-sentence cuts that destroy context for the model.\n\n### Risks\nComputational overhead: It requires running embedding models during the ingestion phase, which is more expensive than fixed-length character splitting."
    },
    { 
      id: 'semantic-similarity', 
      name: 'Semantic Similarity', 
      category: 'Techniques', 
      maturity: 'Adopt', 
      impact: 'Very High', 
      description: 'Mathematical closeness of concepts in vector space.',
      details: "### Definition\nSemantic Similarity is the measure of how conceptually related two pieces of text are, typically calculated using cosine similarity on vector embeddings.\n\n### Application\nIt is the mathematical heart of semantic search and recommendation engines, allowing systems to find 'apples' when a user searches for 'fruit'.\n\n### Risks\nEmbedding drift: As models evolve, the vector space can change, potentially leading to 'nearest neighbors' that are mathematically close but logically unrelated."
    },
    { 
      id: 'context-window', 
      name: 'Context Window', 
      category: 'Techniques', 
      maturity: 'Adopt', 
      impact: 'High', 
      description: 'Total token memory available in a single inference turn.',
      details: "### Definition\nThe Context Window is the maximum sequence length a model can process in a single pass, including system instructions, input text, and generated output.\n\n### Application\nDetermines whether a model can analyze an entire book, codebase, or legal transcript without needing to summarize or split the data into multiple turns.\n\n### Risks\n'Lost in the Middle': Models often have higher accuracy at the start and end of their context window, frequently failing to recall information buried in the middle."
    },
    { 
      id: 'agentic-rag', 
      name: 'Agentic RAG', 
      category: 'Techniques', 
      maturity: 'Trial', 
      impact: 'Critical', 
      description: 'AI planning and executing multi-step retrieval strategies.', 
      keyTech: 'LangGraph',
      details: "### Definition\nAgentic RAG moves beyond simple 'search-and-stuff' retrieval by giving the AI agency. The model first plans a search strategy, evaluates the search results for quality, and decides if it needs more info before answering.\n\n### Application\nCritical for complex research tasks where the answer isn't in a single document but requires synthesizing data from multiple disparate sources.\n\n### Risks\nRecursive loops and high token consumption. Without strict 'exit conditions,' an agent might continue searching indefinitely, leading to massive API bills."
    },
    { 
      id: 'prompt-chaining', 
      name: 'Prompt Chaining', 
      category: 'Techniques', 
      maturity: 'Trial', 
      impact: 'High', 
      description: 'Sequencing multiple prompts to solve complex tasks.',
      details: "### Definition\nPrompt Chaining is a design pattern where the output of one model call is passed as the input to a subsequent model call to perform complex, multi-stage reasoning.\n\n### Application\nUsed for high-reliability data pipelines, such as 'Extract' -> 'Validate' -> 'Format' -> 'Translate'. It reduces hallucination by focusing the model on one task at a time.\n\n### Risks\nLatency and cost: Every 'link' in the chain requires a full round-trip to the model, significantly increasing the time to generate a final result."
    },
    { 
      id: 'knowledge-distillation', 
      name: 'Knowledge Distillation', 
      category: 'Techniques', 
      maturity: 'Trial', 
      impact: 'High', 
      description: 'Transferring knowledge from teacher models to student models.',
      details: "### Definition\nKnowledge Distillation is a compression technique where a smaller 'student' model is trained to reproduce the behavior and output distribution of a larger 'teacher' model.\n\n### Application\nCreating high-speed, domain-specific models for production where the cost and latency of a massive frontier model are prohibitive.\n\n### Risks\n'Dark knowledge' loss: Students often capture the teacher's surface-level patterns but miss the deep reasoning capabilities and edge-case robustness."
    },
    { 
      id: 'synthetic-data', 
      name: 'Synthetic Data', 
      category: 'Techniques', 
      maturity: 'Trial', 
      impact: 'Very High', 
      description: 'AI-generated training data for low-resource domains.', 
      keyTech: 'Gretel.ai',
      details: "### Definition\nSynthetic Data is information that is artificially generated by an AI model rather than collected from real-world events or users.\n\n### Application\nUsed to train models in privacy-sensitive domains (like healthcare) or to 'bootstrap' models for rare edge cases where real data is scarce.\n\n### Risks\nModel Collapse: If models are trained too heavily on their own outputs, they can lose variability and start producing repetitive, low-quality 'gibberish'."
    },
    { 
      id: 'data-distillation', 
      name: 'Data Distillation', 
      category: 'Techniques', 
      maturity: 'Trial', 
      impact: 'Medium', 
      description: 'Compressing datasets into essential representative knowledge.',
      details: "### Definition\nData Distillation is a dataset reduction method that identifies and extracts the most information-dense training samples to create a smaller, high-quality training set.\n\n### Application\nAccelerating training cycles and reducing storage costs by removing redundant or noisy data points that don't contribute to model convergence.\n\n### Risks\nOverfitting: If the distillation process is too aggressive, the resulting dataset may lose the diversity needed for the model to generalize to real-world data."
    },
    { 
      id: 'long-term-memory', 
      name: 'Long-Term Agent Memory', 
      category: 'Techniques', 
      maturity: 'Trial', 
      impact: 'Strategic', 
      description: 'Persistence architectures for cross-session agent knowledge.', 
      keyTech: 'MemGPT',
      details: "### Definition\nLong-Term Agent Memory utilizes external storage (databases) and ranking algorithms to allow AI agents to recall user preferences and past interactions over months or years.\n\n### Application\nEnabling persistent 'co-pilots' that learn how you code, write, or manage projects, providing contextually relevant assistance based on historic context.\n\n### Risks\nMemory management: Deciding what to 'forget' is hard. Storing every interaction leads to high costs and noise during retrieval."
    },
    { 
      id: 'graph-rag', 
      name: 'GraphRAG', 
      category: 'Techniques', 
      maturity: 'Assess', 
      impact: 'High', 
      description: 'Retrieval augmented by structured knowledge graphs.', 
      keyTech: 'Neo4j',
      details: "### Definition\nGraphRAG combines vector embeddings with a structured Knowledge Graph (KG). It maps entities and their relationships (e.g., 'Company A' -> 'Acquired' -> 'Company B').\n\n### Application\nSolves the 'multi-hop' problem where a model needs to find connections between concepts that don't share similar keywords but are logically linked.\n\n### Risks\nGenerating the initial Knowledge Graph is computationally expensive and requires high-quality source data to avoid 'garbage-in, garbage-out' scenarios."
    },
    { 
      id: 'ai-alignment', 
      name: 'AI Alignment', 
      category: 'Techniques', 
      maturity: 'Assess', 
      impact: 'Very High', 
      description: 'Ensuring model goals match human values and intent.',
      details: "### Definition\nAI Alignment is the technical and philosophical challenge of ensuring that an AI system's objectives and behaviors precisely match human values and instructions.\n\n### Application\nFundamental to safe AI deployment. It involves techniques like RLHF, DPO, and Constitutional AI to prevent models from pursuing harmful goals.\n\n### Risks\nSpecification Gaming: Models may find 'shortcuts' that satisfy the reward function (making it look like they are aligned) without actually understanding the underlying value."
    },
    { 
      id: 'world-models', 
      name: 'World Models', 
      category: 'Techniques', 
      maturity: 'Experimental', 
      impact: 'Strategic', 
      description: 'AI internal simulations of physical or logical systems.',
      details: "### Definition\nA World Model is a component that enables an agent to simulate the future state of its environment, allowing it to 'imagine' consequences before acting.\n\n### Application\nEssential for advanced robotics and autonomous vehicles, where the AI needs to predict the physical movement of objects or the logical outcomes of complex actions.\n\n### Risks\nSim-to-Real gap: If the world model's internal simulation is even slightly inaccurate, the agent's real-world actions can become erratic or dangerous."
    },
    { 
      id: 'liquid-networks', 
      name: 'Liquid Neural Networks', 
      category: 'Techniques', 
      maturity: 'Experimental', 
      impact: 'High', 
      description: 'Dynamically adjusting architectures for time-series data.', 
      keyTech: 'MIT Liquid AI',
      details: "### Definition\nLiquid Neural Networks are a new class of AI inspired by the biological brains of small organisms, using differential equations to create a continuous-time model.\n\n### Application\nSuperior performance for time-series data, such as autonomous driving, drone navigation, and financial forecasting where temporal context is fluid.\n\n### Risks\nImmature tooling: Standard libraries like PyTorch are still optimizing for these architectures, making them harder to deploy in large-scale production."
    },
    { 
      id: 'federated-learning', 
      name: 'Federated Learning', 
      category: 'Techniques', 
      maturity: 'Experimental', 
      impact: 'Medium', 
      description: 'Decentralized training without moving raw data.',
      details: "### Definition\nFederated Learning allows models to be trained on decentralized data residing on end-user devices or servers without ever moving the raw data to a central server.\n\n### Application\nPrivacy-preserving training for mobile phones (auto-complete) or healthcare institutions sharing model insights without sharing private patient records.\n\n### Risks\nInconsistent data quality (Non-IID) and high communication overhead between the central 'aggregator' and the thousands of edge devices."
    },
    { 
      id: 'neuro-symbolic-strategy', 
      name: 'Neuro-Symbolic Strategy', 
      category: 'Techniques', 
      maturity: 'Experimental', 
      impact: 'Very High', 
      description: 'Combining neural learning with symbolic logical rules.',
      details: "### Definition\nNeuro-Symbolic AI combines the pattern-recognition power of neural networks with the formal logic and interpretability of symbolic systems.\n\n### Application\nCreating AI that can explain its reasoning in mathematical terms, essential for scientific discovery, formal software verification, and regulated decision making.\n\n### Risks\nIntegration friction: Marrying the 'fuzzy' world of gradients with the 'exact' world of logic rules is a complex engineering and mathematical challenge."
    },
    { 
      id: 'gpu-clusters', 
      name: 'GPU Clusters', 
      category: 'Platforms', 
      maturity: 'Adopt', 
      impact: 'Strategic', 
      description: 'Distributed compute for training and heavy inference.', 
      keyTech: 'NVIDIA H100',
      details: "### Definition\nGPU Clusters are massive arrays of interconnected GPUs (often thousands of H100s or B200s) designed for high-throughput, low-latency parallel processing.\n\n### Application\nThe physical infrastructure required to train frontier models (like GPT-4) or run massive real-time inference clusters for enterprise-grade AI products.\n\n### Risks\nHigh capital expenditure and massive power requirements. Managing thermal limits and network congestion in these clusters is a full-time engineering specialty."
    },
    { 
      id: 'serving-infra', 
      name: 'Serving Infrastructure', 
      category: 'Platforms', 
      maturity: 'Adopt', 
      impact: 'Critical', 
      description: 'High-throughput model serving layers.', 
      keyTech: 'vLLM, Triton',
      details: "### Definition\nServing Infrastructure refers to the software stack (engines like vLLM) that manages model loading, request batching, and KV-cache management to maximize GPU utilization.\n\n### Application\nThe foundation of production AI APIs. It ensures that multiple users can query a model simultaneously without requests being blocked or timing out.\n\n### Risks\nComplex scaling: Scaling model serving is not as simple as scaling web servers. It requires deep knowledge of CUDA, VRAM limits, and network throughput."
    },
    { 
      id: 'vector-db', 
      name: 'Vector Databases', 
      category: 'Platforms', 
      maturity: 'Adopt', 
      impact: 'Critical', 
      description: 'Specialized storage for high-dimensional semantic vectors.', 
      keyTech: 'Pinecone, Weaviate',
      details: "### Definition\nVector Databases are specialized storage systems that index high-dimensional numerical representations (embeddings) of data to enable rapid similarity searches.\n\n### Application\nEssential for RAG systems to retrieve relevant documents based on semantic meaning rather than exact keyword matches.\n\n### Risks\nHigh memory usage and cost at scale. Maintaining index freshness during high-volume data updates can lead to significant latency spikes."
    },
    { 
      id: 'dist-training', 
      name: 'Distributed Training', 
      category: 'Platforms', 
      maturity: 'Adopt', 
      impact: 'Critical', 
      description: 'Scaling model training across multiple compute nodes.', 
      keyTech: 'DeepSpeed, FSDP',
      details: "### Definition\nDistributed Training uses techniques like Data Parallelism and Model Parallelism to split a single training job across hundreds of GPUs simultaneously.\n\n### Application\nRequired for any model larger than ~7B parameters. It allows researchers to train massive models in weeks rather than decades.\n\n### Risks\nNetwork bottlenecks: The speed of training is often limited by the interconnect (e.g. InfiniBand) rather than the raw compute power of the GPUs themselves."
    },
    { 
      id: 'inference-opt', 
      name: 'Inference Optimization', 
      category: 'Platforms', 
      maturity: 'Adopt', 
      impact: 'Very High', 
      description: 'Hardware-aware acceleration of model responses.', 
      keyTech: 'FlashAttention',
      details: "### Definition\nInference Optimization involves low-level kernel tuning (like FlashAttention) and hardware-specific compilation to make AI models respond faster and cheaper.\n\n### Application\nCutting the cost per 1M tokens by 50-80% while simultaneously reducing the 'Time To First Token' (TTFT) for a better user experience.\n\n### Risks\nHardware lock-in: Highly optimized kernels for NVIDIA H100s might not run at all on AMD GPUs or Apple silicon without significant rewrites."
    },
    { 
      id: 'inference-latency', 
      name: 'Inference Latency Engineering', 
      category: 'Platforms', 
      maturity: 'Adopt', 
      impact: 'High', 
      description: 'Minimizing TTFT and total response time.',
      details: "### Definition\nInference Latency Engineering is the specialized practice of optimizing every microsecond of the model response loop, from network handshake to final token generation.\n\n### Application\nCritical for real-time voice synthesis and interactive chatbots where a delay of more than 500ms makes the system feel sluggish and 'un-human'.\n\n### Risks\nThroughput vs Latency trade-off: Many techniques that make a single request faster (like speculative decoding) can actually lower the total capacity of the server."
    },
    { 
      id: 'real-time-inference-design', 
      name: 'Real-Time Inference Design', 
      category: 'Platforms', 
      maturity: 'Adopt', 
      impact: 'Very High', 
      description: 'Architecting for sub-second user interactions.',
      details: "### Definition\nReal-Time Inference Design is an architectural approach that prioritizes low-latency, streaming responses and persistent connections (WebSockets) for AI interaction.\n\n### Application\nPowering next-generation UI/UX where the AI assists the user in real-time as they type, speak, or interact with a 3D environment.\n\n### Risks\nPersistent state management: Maintaining low-latency connections for thousands of users simultaneously requires complex load balancing and edge compute strategies."
    },
    { 
      id: 'secrets-mgmt-agents', 
      name: 'Secrets Management for Agents', 
      category: 'Platforms', 
      maturity: 'Adopt', 
      impact: 'Critical', 
      description: 'Secure credential injection for tool-enabled agents.', 
      keyTech: 'HashiCorp Vault',
      details: "### Definition\nSecrets Management for Agents is the protocol for securely providing API keys and passwords to AI agents so they can interact with tools without exposing raw credentials.\n\n### Application\nEssential for agents that access corporate databases, personal emails, or financial systems. It uses short-lived tokens and 'scoped' permissions.\n\n### Risks\nPrompt injection leakage: If an agent is not properly sandboxed, a clever user could trick it into 'printing' its internal API keys in the chat window."
    },
    { 
      id: 'feature-store', 
      name: 'Feature Store', 
      category: 'Platforms', 
      maturity: 'Trial', 
      impact: 'High', 
      description: 'Unified data repository for training and serving features.', 
      keyTech: 'Tecton',
      details: "### Definition\nA Feature Store is a centralized repository that stores curated datasets ('features') and serves them consistently for both training and real-time inference.\n\n### Application\nEnsures that the data used to train a model is identical to the data used when the model is running in production, preventing 'training-serving skew'.\n\n### Risks\nOperational complexity: Maintaining a feature store at enterprise scale requires significant data engineering effort and high-availability infrastructure."
    },
    { 
      id: 'llmops', 
      name: 'LLMOps', 
      category: 'Platforms', 
      maturity: 'Trial', 
      impact: 'Strategic', 
      description: 'Specialized operational pipelines for LLM lifecycles.', 
      keyTech: 'LangSmith',
      details: "### Definition\nLLMOps is the extension of MLOps to specifically handle the unique lifecycle of LLMs, including prompt versioning, context-caching, and hallucination monitoring.\n\n### Application\nThe backbone of any production-grade AI product. It ensures that when you swap GPT-4o for a newer model, the entire system doesn't break due to prompt sensitivity.\n\n### Risks\nHigh toolchain fragmentation. The 'best-in-class' tools change monthly, risking vendor lock-in with immature platforms."
    },
    { 
      id: 'context-caching', 
      name: 'Context Caching', 
      category: 'Platforms', 
      maturity: 'Trial', 
      impact: 'High', 
      description: 'Caching frequent context blocks to lower latency/cost.',
      details: "### Definition\nContext Caching is a platform-level optimization that stores the computed state of a prompt's prefix on the GPU to avoid re-processing it for subsequent calls.\n\n### Application\nMassive cost and latency savings for RAG systems where the same 'Reference Material' or 'System Instruction' is sent with every user query.\n\n### Risks\nCache eviction strategy: Managing which blocks of text stay on the limited GPU memory and which are deleted is a complex balancing act of cost and performance."
    },
    { 
      id: 'depin-compute', 
      name: 'DePIN Compute', 
      category: 'Platforms', 
      maturity: 'Experimental', 
      impact: 'High', 
      description: 'Decentralized physical compute networks.', 
      keyTech: 'Akash, Render',
      details: "### Definition\nDePIN (Decentralized Physical Infrastructure Networks) Compute allows organizations to rent GPU power from a global, peer-to-peer marketplace instead of a central cloud provider.\n\n### Application\nSignificant cost reduction for batch inference or fine-tuning jobs that are not time-sensitive and do not require ultra-low-latency interconnects.\n\n### Risks\nSecurity and uptime: Because the GPUs are owned by individuals/small providers, ensuring data privacy and 99.9% availability is much harder than with AWS/Azure."
    },
    { 
      id: 'quantum-mlops', 
      name: 'Quantum MLOps', 
      category: 'Platforms', 
      maturity: 'Experimental', 
      impact: 'Medium', 
      description: 'Operating hybrid classical-quantum ML workloads.',
      details: "### Definition\nQuantum MLOps is the early-stage field of managing the lifecycle of machine learning models that utilize quantum computers for optimization or feature mapping.\n\n### Application\nFuture-facing research in molecular discovery and cryptography where classical computers hit their physical limits of complexity.\n\n### Risks\nExtreme immaturity: We are currently in the 'NISQ' (Noisy Intermediate-Scale Quantum) era, where hardware is prone to high error rates and limited qubit counts."
    },
    { 
      id: 'rag-core', 
      name: 'RAG (Retrieval-Augmented Generation)', 
      category: 'Tools', 
      maturity: 'Adopt', 
      impact: 'Very High', 
      description: 'Grounding models in external data for accuracy.', 
      keyTech: 'LlamaIndex',
      details: "### Definition\nRetrieval-Augmented Generation (RAG) is a system that retrieves relevant snippets from an external database and includes them in the prompt to ground the LLM in factual data.\n\n### Application\nThe standard way to build private chatbots that answer questions about internal company docs, wikis, and customer tickets without needing to re-train the model.\n\n### Risks\nContext stuffing: If the retrieval system pulls in irrelevant or conflicting data, the model can become confused and produce incorrect answers based on the 'noise'."
    },
    { 
      id: 'tool-use', 
      name: 'Tool Use / Function Calling', 
      category: 'Tools', 
      maturity: 'Adopt', 
      impact: 'Critical', 
      description: 'Models interacting with external APIs via structured calls.',
      details: "### Definition\nTool Use (Function Calling) allows an LLM to generate structured JSON or code that is then executed by the hosting application to perform real-world actions.\n\n### Application\nEnabling AI to 'look up the current weather', 'query a SQL database', or 'send an email' by treating the model as the reasoning core of a larger system.\n\n### Risks\nSecurity: An agent given access to a 'Delete User' tool must be strictly sandboxed and monitored to prevent malicious or accidental misuse of power."
    },
    { 
      id: 'orch-frameworks', 
      name: 'LLM Orchestration', 
      category: 'Tools', 
      maturity: 'Adopt', 
      impact: 'Very High', 
      description: 'Connecting models, tools, and memory into applications.', 
      keyTech: 'LangChain',
      details: "### Definition\nLLM Orchestration frameworks provide standardized abstractions (chains, routers, memory) to help developers build complex, multi-step AI applications.\n\n### Application\nRapid prototyping of AI agents. They provide 'connectors' for hundreds of databases and APIs, allowing devs to focus on the logic rather than the plumbing.\n\n### Risks\nAbstraction bloat: Some frameworks can make simple tasks overly complex, making it difficult to debug the raw prompts being sent to the model."
    },
    { 
      id: 'modular-ai', 
      name: 'Modular AI Architecture', 
      category: 'Tools', 
      maturity: 'Adopt', 
      impact: 'High', 
      description: 'Decoupled systems with swappable AI components.',
      details: "### Definition\nModular AI is a design philosophy where models, data sources, and business logic are decoupled, allowing any individual component to be upgraded without re-writing the entire stack.\n\n### Application\nFuture-proofing enterprise systems. When a better embedding model or a cheaper LLM is released, you can swap it in minutes rather than weeks.\n\n### Risks\nIntegration testing: Every time a model is swapped, the entire pipeline must be re-evaluated to ensure the quality of responses hasn't subtly degraded."
    },
    { 
      id: 'multi-agent-systems', 
      name: 'Multi-Agent Systems', 
      category: 'Tools', 
      maturity: 'Trial', 
      impact: 'Critical', 
      description: 'Specialized agents collaborating on complex tasks.', 
      keyTech: 'CrewAI, AutoGen',
      details: "### Definition\nMulti-Agent Systems involve multiple autonomous 'specialist' agents (e.g., a 'Researcher' and a 'Writer') communicating to solve a complex task.\n\n### Application\nAutomating software engineering (e.g., one agent writes tests, another writes code, another reviews). It breaks down monolithic problems into manageable parts.\n\n### Risks\nCascading Failures: If the 'Researcher' agent hallucinates, every subsequent agent in the chain will base their work on false premises."
    },
    { 
      id: 'agentic-loops', 
      name: 'Agentic Loops', 
      category: 'Tools', 
      maturity: 'Trial', 
      impact: 'Very High', 
      description: 'Iterative think-act-observe loops for autonomy.',
      details: "### Definition\nAgentic Loops are iterative execution cycles where an agent performs an action, observes the result, and adjusts its plan in real-time until the goal is met.\n\n### Application\nAutonomous web browsing, self-healing code generators, and complex project management agents that need to handle unexpected errors gracefully.\n\n### Risks\nEndless loops: Without 'max iteration' caps, an agent could get stuck in a logic loop, repeatedly calling an API and wasting thousands of dollars in tokens."
    },
    { 
      id: 'model-routing', 
      name: 'Model Routing & Selection', 
      category: 'Tools', 
      maturity: 'Trial', 
      impact: 'High', 
      description: 'Intelligent middleware for cost/performance optimized inference.', 
      keyTech: 'Martian, RouteLLM',
      details: "### Definition\nModel Routing is an intelligent middleware layer that analyzes an incoming user query and routes it to the most efficient model (e.g. GPT-4 for logic, Llama-3 for chat).\n\n### Application\nEnterprise cost optimization. By using SLMs for 80% of simple tasks, companies can save massive amounts while maintaining high quality for complex queries.\n\n### Risks\nRouter latency: The extra step of analyzing the intent of the message adds a small amount of latency to every interaction."
    },
    { 
      id: 'mcp', 
      name: 'MCP (Model Context Protocol)', 
      category: 'Tools', 
      maturity: 'Trial', 
      impact: 'Critical', 
      description: 'Universal tool/data standard for all models.', 
      keyTech: 'Anthropic',
      details: "### Definition\nModel Context Protocol (MCP) is an open standard designed to decouple AI models from the data sources they use, creating a universal 'connector' for tools.\n\n### Application\nEnables a developer to build a 'GitHub tool' once and have it work instantly across Claude, Gemini, and internal custom models without custom glue code.\n\n### Risks\nAs a newer standard, it faces an 'adoption cliff' where its value is limited until enough data sources and model providers commit to the protocol."
    },
    { 
      id: 'multi-modal-arch', 
      name: 'Multi-Modal Architecture', 
      category: 'Tools', 
      maturity: 'Trial', 
      impact: 'Very High', 
      description: 'Integrating vision, audio, and text into unified systems.',
      details: "### Definition\nMulti-Modal Architecture refers to models and systems that can natively process and interlink different data types like text, images, video, and audio in a single latent space.\n\n### Application\nNext-gen customer support (watching a video of a user problem) and automated visual inspection systems where text description alone is insufficient.\n\n### Risks\nData imbalance: Training multi-modal models is difficult because text data is vastly more structured and available than high-quality video-text pairs."
    },
    { 
      id: 'cicd-ct', 
      name: 'CI/CD/CT', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'Critical', 
      description: 'Continuous training integration for model updates.',
      details: "### Definition\nCI/CD/CT (Continuous Integration, Deployment, and Training) is the practice of automating the testing and deployment of not just code, but also models and their updated weights.\n\n### Application\nEnsuring that every time you update your RAG database or fine-tune your model, it passes a suite of safety and performance benchmarks before going live.\n\n### Risks\nPipeline complexity: Managing 'Golden Datasets' and automated evaluation metrics that actually match human judgment is a significant engineering challenge."
    },
    { 
      id: 'model-registry', 
      name: 'Model Registry', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'Very High', 
      description: 'Central hub for model versioning and lineage.', 
      keyTech: 'MLflow',
      details: "### Definition\nA Model Registry is a central repository for tracking model artifacts, versions, metadata, and lineage across the entire machine learning lifecycle.\n\n### Application\nEnterprise governance. It allows teams to know exactly which version of a model is in production, what data it was trained on, and who approved its deployment.\n\n### Risks\nVersion sprawl: Without strict naming conventions, a registry can quickly become cluttered with hundreds of 'experimental' models that serve no purpose."
    },
    { 
      id: 'monitoring-obs', 
      name: 'Monitoring & Observability', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'Critical', 
      description: 'Tracking health and semantics in production.',
      details: "### Definition\nAI Observability is the practice of monitoring not just 'up/down' health, but also semantic quality, token costs, and user satisfaction of model responses in real-time.\n\n### Application\nDetecting when a model starts producing 'gibberish' or becomes unhelpfully cautious due to a software update or a shift in user behavior.\n\n### Risks\nData privacy: Monitoring model logs often means seeing raw user data, which requires strict encryption and access control to comply with GDPR/HIPAA."
    },
    { 
      id: 'data-lineage', 
      name: 'Observability & Lineage', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'Very High', 
      description: 'Tracking data from raw source to model input.',
      details: "### Definition\nData Lineage is the process of tracking the movement and transformation of data from its raw source to the moment it is consumed as a prompt or training point.\n\n### Application\nEssential for debugging RAG systems. If the AI gives a wrong answer, lineage tells you exactly which document (and which version) caused the error.\n\n### Risks\nMetadata overhead: Tracking every transformation step for petabytes of data can add significant storage and compute costs to your data platform."
    },
    { 
      id: 'drift-detection', 
      name: 'Drift Detection', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'Very High', 
      description: 'Detecting when data patterns or concepts shift.',
      details: "### Definition\nDrift Detection is an automated monitoring process that flags when the distribution of incoming user data (input drift) or model accuracy (output drift) changes over time.\n\n### Application\nCritical for financial or security models where a shift in 'normal' behavior could signal new fraud patterns or market volatility that the model wasn't trained on.\n\n### Risks\nFalse Alarms: Natural seasonal shifts (e.g. Christmas shopping patterns) can look like drift to naive algorithms, leading to 'alert fatigue' for MLOps teams."
    },
    { 
      id: 'experiment-tracking', 
      name: 'Experiment Tracking', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'High', 
      description: 'Logging parameters and metrics for every run.',
      details: "### Definition\nExperiment Tracking is the practice of logging all hyperparameters, code versions, datasets, and performance metrics for every single model training or evaluation run.\n\n### Application\nReproducibility in AI research. It allows a scientist to 'go back in time' and recreate a successful model that was built six months ago.\n\n### Risks\nLogging noise: If too many metrics are tracked without purpose, the 'signal' of what actually makes a model better can be lost in a sea of irrelevant data charts."
    },
    { 
      id: 'eval-harness', 
      name: 'Evaluation Harness', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'High', 
      description: 'Automated test suites for AI performance/safety.', 
      keyTech: 'RAGAS',
      details: "### Definition\nAn Evaluation Harness is an automated framework that subjects AI models to standardized benchmarks and proprietary test suites to measure performance and safety.\n\n### Application\nCritical for 'Golden Dataset' testing to ensure that updating a model doesn't result in performance regressions for specific customer use cases.\n\n### Risks\nTest Contamination: If benchmark questions are present in the model's training data, the results will be artificially inflated and misleading."
    },
    { 
      id: 'data-versioning', 
      name: 'Data Versioning', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'High', 
      description: 'Immutable snapshots of training/eval datasets.', 
      keyTech: 'DVC',
      details: "### Definition\nData Versioning treats datasets like source code, creating immutable snapshots (e.g. via DVC or LakeFS) so that a model can be tied to a specific state of the data.\n\n### Application\nLegal compliance and scientific integrity. If a model's prediction is challenged, you can prove exactly what data the model had 'seen' at that point in time.\n\n### Risks\nStorage bloat: Maintaining full copies of massive datasets for every version can quickly become prohibitively expensive without 'deduplication' technology."
    },
    { 
      id: 'model-governance', 
      name: 'Model Governance', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'Critical', 
      description: 'Policies for safe and ethical AI deployment.',
      details: "### Definition\nModel Governance is the framework of rules, roles, and review processes that ensure AI is used ethically, legally, and within the risk tolerance of the organization.\n\n### Application\nSetting up 'Ethics Boards' and approval workflows for new AI use cases, especially in sensitive areas like hiring, credit scoring, or healthcare.\n\n### Risks\nRed tape: Overly burdensome governance can kill innovation, causing the company to fall behind faster-moving competitors who take more calculated risks."
    },
    { 
      id: 'guardrails', 
      name: 'AI Guardrails', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'Critical', 
      description: 'Real-time filtering of unsafe inputs/outputs.',
      details: "### Definition\nGuardrails are programmable security and logic layers that validate inputs and outputs in real-time. They act as a 'firewall' for AI behavior.\n\n### Application\nEnsuring a customer support bot doesn't accidentally reveal internal profit margins or use offensive language if 'jailbroken' by a user.\n\n### Risks\nHigh False-Positive Rates: Overly aggressive guardrails can 'lobotomize' a model, making it refuse to answer perfectly safe and valid business queries."
    },
    { 
      id: 'red-teaming', 
      name: 'AI Red Teaming', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'Very High', 
      description: 'Adversarial testing for model vulnerabilities.',
      details: "### Definition\nAI Red Teaming is a security practice where 'adversarial' agents (human or AI) attempt to bypass a model's safety filters to find hidden vulnerabilities.\n\n### Application\nProactive security. By finding a 'jailbreak' before a hacker does, an organization can update its guardrails and protect its users and brand reputation.\n\n### Risks\nIncomplete coverage: No matter how much you red-team, new 'latent' vulnerabilities can always be found by thousands of real-world users once the model is public."
    },
    { 
      id: 'ai-identity-auth', 
      name: 'AI Identity & Auth', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'Critical', 
      description: 'Unique identities and access control for AI agents.', 
      keyTech: 'OIDC',
      details: "### Definition\nAI Identity & Auth is the system of giving setiap agent a cryptographically verifiable 'Machine Identity' so it can prove who it is when accessing APIs.\n\n### Application\nApplying 'Least Privilege' security. A 'HR Bot' can only access HR databases, while a 'Code Bot' can only access specific GitHub repos, even if they share the same model.\n\n### Risks\nIdentity hijacking: If an agent's identity token is stolen, a malicious actor can impersonate the agent and perform actions with its authorized permissions."
    },
    { 
      id: 'ai-incident-killswitches', 
      name: 'AI Incident Kill-switches', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'Critical', 
      description: 'Fail-safe mechanisms for pausing autonomous AI systems.',
      details: "### Definition\nAI Kill-switches are manual or automated fail-safes that instantly sever an agent's access to external tools and stop all processing during an emergency.\n\n### Application\nPreventing a runaway autonomous agent from draining a corporate bank account or deleting a production database during a logic failure or attack.\n\n### Risks\nFalse activation: If a kill-switch is too sensitive, it could shut down mission-critical services due to a non-harmful edge case, leading to downtime."
    },
    { 
      id: 'eu-ai-act', 
      name: 'Regulation (EU AI Act)', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'Critical', 
      description: 'Compliance with global AI risk categories.',
      details: "### Definition\nThe EU AI Act is the world's first comprehensive legal framework for AI, categorizing applications based on risk (Unacceptable, High, Limited, Minimal).\n\n### Application\nMandatory for any organization deploying AI in the European market. It requires rigorous transparency, data governance, and human oversight for high-risk systems.\n\n### Risks\nNon-compliance can result in massive fines (up to 7% of global turnover). It may also slow down deployment speed due to heavy documentation requirements."
    },
    { 
      id: 'bias-mitigation', 
      name: 'Bias Mitigation', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'High', 
      description: 'Reducing algorithmic discrimination in outputs.',
      details: "### Definition\nBias Mitigation is the technical practice of identifying and reducing discriminatory patterns in training data or model weights to ensure fair treatment of all demographic groups.\n\n### Application\nEssential for AI used in social infrastructure (lending, hiring, law enforcement) to prevent the amplification of existing historical prejudices.\n\n### Risks\nFairness trade-offs: Often, optimizing for one mathematical definition of 'fairness' can slightly lower the overall accuracy of the model on the general population."
    },
    { 
      id: 'xai', 
      name: 'Explainability (XAI)', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'High', 
      description: 'Interpreting how models reach specific conclusions.',
      details: "### Definition\nExplainable AI (XAI) is the set of techniques (like attention maps or SHAP values) that pull back the 'black box' of deep learning to show which input features influenced a result.\n\n### Application\nBuilding trust with domain experts (doctors, pilots, judges) who need to know 'why' a model made a specific high-stakes recommendation.\n\n### Risks\nDeceptive explanations: Some XAI methods can generate 'plausible' explanations that don't actually match the underlying mathematical reality of how the model works."
    },
    { 
      id: 'hitl', 
      name: 'Human-in-the-loop (HITL)', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'Strategic', 
      description: 'Manual review integrated into automated workflows.',
      details: "### Definition\nHuman-in-the-loop (HITL) is an architectural pattern where an AI system pauses at critical decision points to wait for human review, approval, or correction.\n\n### Application\nHigh-stakes enterprise automation (e.g. paying an invoice > $5,000) where the AI handles 95% of the data prep but the final 'Send' requires a human finger.\n\n### Risks\nAutomation bias: Over time, humans become accustomed to the AI being right and may start 'rubber-stamping' its outputs without actually reviewing them carefully."
    },
    { 
      id: 'roi-modeling', 
      name: 'AI ROI Modeling', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'Strategic', 
      description: 'Calculating business value vs. compute cost.',
      details: "### Definition\nAI ROI (Return on Investment) Modeling is the financial practice of measuring the actual business impact (productivity, revenue) against the total cost of AI ownership.\n\n### Application\nJustifying the multi-million dollar GPU budgets to boards and CFOs by proving that AI is driving concrete efficiencies rather than just serving as a 'cool feature'.\n\n### Risks\nHard-to-measure gains: It's easy to calculate API costs, but measuring the 'saved time' of an engineer or the 'better quality' of a marketing plan is notoriously difficult."
    },
    { 
      id: 'hallucination-mgmt', 
      name: 'Hallucination Management', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'High', 
      description: 'Methods to detect and prevent model hallucinations.',
      details: "### Definition\nHallucination Management is a system-level approach that uses multi-step verification and external 'fact-checkers' to ensure that every AI output is grounded in truth.\n\n### Application\nProtecting corporate brand trust by ensuring that customer-facing agents never 'make up' fake policies, prices, or product features.\n\n### Risks\nFalse Fact-checking: If theFact-checker itself is a model, you now have two models that could potentially hallucinate together, creating a 'hallucination loop'."
    },
    { 
      id: 'data-leakage-prev', 
      name: 'Data Leakage Prevention', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'Critical', 
      description: 'Ensuring test data doesn\'t contaminate training.',
      details: "### Definition\nData Leakage Prevention is the strict separation of training, validation, and test datasets to ensure that the model doesn't 'see the answers' before it is tested.\n\n### Application\nCritical for predictive accuracy. If leakage occurs, a model will look perfect in the lab but fail completely when it encounters truly new data in the real world.\n\n### Risks\nTemporal leakage: In time-series data, it is very easy to accidentally train on 'future' data (e.g. using tomorrow's price to predict today's), which is impossible in production."
    },
    { 
      id: 'model-drift-adopt', 
      name: 'Model Drift', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'Strategic', 
      description: 'Monitoring for accuracy decay in live environments.',
      details: "### Definition\nModel Drift (or Concept Drift) is the phenomenon where a model's performance degrades because the underlying relationships in the real-world data have changed.\n\n### Application\nRegularly re-training recommendation or fraud models to ensure they stay relevant as user fashions change or as criminals invent new ways to bypass security.\n\n### Risks\nSilent failure: Unlike code that 'breaks' with an error message, a drifting model will keep giving 'successful' answers that are just increasingly wrong and irrelevant."
    },
    { 
      id: 'fitting', 
      name: 'Overfitting / Underfitting', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'High', 
      description: 'Managing model generalization vs. memorization.',
      details: "### Definition\nOverfitting is when a model memorizes its training data too perfectly, losing the ability to generalize. Underfitting is when the model is too simple to learn the patterns at all.\n\n### Application\nFine-tuning the 'Sweet Spot' of training duration and model size to ensure it works well on the specific data it was trained on AND all future unknown data.\n\n### Risks\nMemorization leakage: Overfitted models can sometimes 'spout out' verbatim training data, which could include private user info if not carefully scrubbed."
    },
    { 
      id: 'forgetting', 
      name: 'Catastrophic Forgetting', 
      category: 'Governance', 
      maturity: 'Adopt', 
      impact: 'High', 
      description: 'Preventing the loss of old skills during new training.',
      details: "### Definition\nCatastrophic Forgetting is the tendency of an artificial neural network to completely and abruptly forget previously learned information upon learning new information.\n\n### Application\nContinuous learning systems. If you train a model to 'code in Python' and then 'code in Java', it might lose its ability to write valid Python if not trained carefully.\n\n### Risks\nMaintenance cost: To prevent forgetting, you often have to re-train the model on 'a little bit of everything' every time you want to teach it something new."
    },
    { 
      id: 'differential-privacy', 
      name: 'Differential Privacy', 
      category: 'Governance', 
      maturity: 'Trial', 
      impact: 'High', 
      description: 'Noise-based privacy protection for datasets.',
      details: "### Definition\nDifferential Privacy is a mathematical framework that adds a precisely calculated amount of 'noise' to a dataset so that individual records cannot be identified, but group patterns remain.\n\n### Application\nTraining AI on highly sensitive personal data (e.g. medical or financial) while providing a mathematical guarantee that no individual's private data can be extracted.\n\n### Risks\nAccuracy loss: There is a direct trade-off (the 'Epsilon Budget') between how much privacy you have and how accurate the resulting model will be."
    },
    { 
      id: 'constitutional-ai', 
      name: 'Constitutional AI', 
      category: 'Governance', 
      maturity: 'Trial', 
      impact: 'Very High', 
      description: 'Alignment via a set of high-level principles.',
      details: "### Definition\nConstitutional AI is an alignment method where the model is given a set of written 'principles' (a constitution) and trains itself by critiquing its own behavior against them.\n\n### Application\nScaling safety without manual human labeling. It allows a model to learn complex ethical behaviors (like being 'harmless' and 'honest') through self-reflection.\n\n### Risks\nAmbiguous principles: If the 'Constitution' is poorly written or contains conflicting values, the model may develop erratic or confusing behavior."
    },
    { 
      id: 'green-ai', 
      name: 'Green AI / Sustainability', 
      category: 'Governance', 
      maturity: 'Assess', 
      impact: 'Medium', 
      description: 'Optimizing carbon footprint and power usage.',
      details: "### Definition\nGreen AI is the practice of optimizing model training and inference to minimize its environmental impact, focusing on energy efficiency and carbon-aware scheduling.\n\n### Application\nCorporate ESG (Environmental, Social, and Governance) compliance. It involves moving compute to regions with 100% renewable energy and using sparse models (MoE) to lower power draw.\n\n### Risks\nPerformance cap: Sometimes the most energy-efficient model is not the most accurate one, forcing companies to choose between sustainability and state-of-the-art power."
    },
    { 
      id: 'zk-data-prep', 
      name: 'Zero-Knowledge Data Prep', 
      category: 'Governance', 
      maturity: 'Experimental', 
      impact: 'Very High', 
      description: 'Provable data compliance without revealing raw data.',
      details: "### Definition\nZero-Knowledge Data Prep uses ZK-proofs to prove that a dataset was cleaned, balanced, and sanitized according to specific rules, without actually showing the data to the auditor.\n\n### Application\nHigh-trust environments like government or banking where a regulator needs to confirm data quality without the risk of seeing private citizen data.\n\n### Risks\nComputational extreme: Generating ZK-proofs for millions of data points is currently orders of magnitude more expensive than standard data processing."
    },
    { 
      id: 'agi-gov', 
      name: 'AGI Governance Frameworks', 
      category: 'Governance', 
      maturity: 'Experimental', 
      impact: 'Strategic', 
      description: 'Policies for handling super-intelligent autonomy.',
      details: "### Definition\nAGI Governance refers to the long-term policy frameworks and international agreements needed to manage systems that reach or exceed human-level intelligence across all domains.\n\n### Application\nExistential risk management. It involves planning for 'fast takeoff' scenarios where an AI could theoretically escape human control or manipulate global systems.\n\n### Risks\nSpeculative nature: Because AGI doesn't exist yet, these frameworks are based on theoretical models and simulations, making them hard to test against real-world reality."
    }
  ]
};

export const RADAR_DATA = COMPETENCY_DB;
