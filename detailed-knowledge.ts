export const TECHNICAL_DETAILS: Record<string, string> = {
  // --- ARCHITECTURE ---
  'agentic-rag': `### Definition
Agentic RAG gives the AI "agency" over the retrieval process. The model plans multiple search steps, evaluates information for completeness, and self-corrects until a quality answer is found.

### Application
Ideal for complex, multi-hop research tasks like financial performance comparisons across different quarterly reports.

### Risks
Higher token costs and latency; potential for infinite loops without clear termination logic.`,

  'world-models': `### Definition
World Models are generative architectures that learn to simulate the environment's dynamics. They act as "mental simulations" for AI agents, allowing them to predict consequences of actions before taking them.

### Application
Critical for advanced robotics and autonomous vehicles where safety-critical decisions require high-fidelity internal predictive models.

### Risks
Extremely high compute requirements; simulations can drift from reality causing "hallucinated physics" failures.`,

  'liquid-networks': `### Definition
Liquid Neural Networks (LNNs) are a new class of AI derived from the brain of microscopic worms. Unlike static models, their parameters change dynamically based on the input flow, allowing them to adapt to new patterns without retraining.

### Application
Time-series forecasting and edge computing where memory efficiency and continuous adaptation are paramount.

### Risks
Still largely in research phase; complex mathematical implementation and lack of mature tool support.`,

  'dist-training-strategies': `### Definition
Distributed Training strategies partition large models across thousands of GPUs. "Data Parallelism" replicates the model while "Model Parallelism" splits the brain itself. ZeRO (Zero Redundancy Optimizer) eliminates memory overlap.

### Application
Necessary for building custom foundational models or training large LLMs on proprietary industry datasets where scale is the primary differentiator.

### Risks
Massive infrastructure capital expenditure; inter-node network latency can bottle-neck training speed.`,

  'orch-frameworks': `### Definition
LLM Orchestration Frameworks (e.g., LangChain, LlamaIndex, PydanticAI) provide the libraries used to connect models to tools, memory, and data pipelines.

### Application
Standardizing how developers build complex RAG agents, handle conversation history, and integrate external APIs into AI workflows.

### Risks
"Framework bloat" can make code hard to debug; high-level abstractions often hide underlying model failures.`,

  // --- OPS & MLOPS ---
  'quantum-mlops': `### Definition
Quantum MLOps is the operational framework for managing hybrid systems where classical data is processed using Quantum-Classical hybrid algorithms for speed or optimization.

### Application
Portfolio optimization, complex molecule discovery, and cryptographic security audits.

### Risks
Requires expensive quantum hardware or simulators; software ecosystem is extremely fragmented and immature.`,

  'depin-compute': `### Definition
DePIN (Decentralized Physical Infrastructure Networks) Compute leverages blockchain to pool idle consumer GPUs into a global cloud for AI training and inference.

### Application
Drastically lowering the cost of compute for startups and academic researchers by bypassing traditional cloud monopolies.

### Risks
Network latency between distributed consumer nodes; privacy concerns for data processed on unknown hardware.`,

  'cicd-ct': `### Definition
CI/CD/CT stands for Continuous Integration, Deployment, and Training. While software uses CI/CD, ML systems require CT to ensure the model automatically updates when performance drops or new data arrives.

### Application
Mandatory for high-frequency trading models or social media recommendation engines where data patterns shift hourly.

### Risks
Automated training can introduce "poisoned" data into production if validation gates aren't strictly enforced.`,

  'model-registry': `### Definition
A Model Registry is a central hub acting as a library for AI models. It tracks every version, its lineage (who trained it and on what), and its deployment status (Staging/Prod).

### Application
Essential for large enterprise teams to ensure everyone uses the correct, approved version of a specific model.

### Risks
Can become a graveyard of unused models if metadata is not properly maintained and audited.`,

  'model-monitoring-obs': `### Definition
Monitoring & Observability goes beyond IT metrics to track "Semantic Health"—checking if the AI's answers are getting toxic, shorter, or less accurate over time.

### Application
A 24/7 dashboard for AI engineers to catch "silent failures" before they impact the end user.

### Risks
Alert fatigue: if monitoring is too sensitive, engineers will start ignoring the warnings.`,

  'drift-detection-ops': `### Definition
Drift Detection identifies when production data diverges from training data. "Concept Drift" is when the definition of a correct answer changes; "Data Drift" is when input patterns change.

### Application
Catching when a loan approval model starts failing because interest rates changed, making its historical training data irrelevant.

### Risks
Requires high-quality baseline data to be accurate; false positives can trigger expensive, unnecessary retraining.`,

  'serving-infra': `### Definition
Serving Infrastructure is the specialized software stack (vLLM, NVIDIA Triton) designed to run AI models at scale with high throughput and low latency.

### Application
The backbone of any AI app, allowing it to handle thousands of concurrent users while keeping server costs low.

### Risks
Highly complex to scale; configuration errors can lead to massive cloud bills or system-wide crashes.`,

  // --- GOVERNANCE ---
  'agi-governance': `### Definition
AGI Governance refers to the policy and technical frameworks designed to manage the development of Artificial General Intelligence, focusing on safe recursive self-improvement.

### Application
Global treaties and internal corporate policies governing the release of high-capability models with potential autonomy.

### Risks
Hypothetical vs. current risk debates can polarize teams; regulation might lag behind technological breakthrough speeds.`,

  'neuro-symbolic-strat': `### Definition
Neuro-symbolic Strategy combines the learning capability of neural networks with the hard-coded logic of symbolic AI to ensure business strategy is both flexible and strictly compliant.

### Application
Automated legal reasoning, aerospace navigation, and industrial process control where "fuzzy" logic is unacceptable.

### Risks
High engineering overhead to translate human rules into machine-readable symbolic logic.`,

  'ai-reg-compliance': `### Definition
AI Regulation involves adhering to legal frameworks like the EU AI Act (risk categories) and the NIST Risk Management Framework (security and reliability).

### Application
Mandatory for deploying AI in the public sector, finance, or healthcare to avoid heavy fines and ensure ethical transparency.

### Risks
Regulatory uncertainty can slow down innovation; requirements differ significantly by region (GDPR vs. CCPA).`,

  'guardrails': `### Definition
AI Guardrails are validation layers that filter AI inputs and outputs for safety, PII, and brand alignment in real-time.

### Application
Mandatory for healthcare or banking assistants to prevent data leaks or restricted advice.

### Risks
Over-guarding can make models unhelpful or cause them to refuse valid queries.`,

  'red-teaming': `### Definition
AI Red Teaming is the practice of rigorously testing an AI for safety and vulnerabilities by simulating creative adversarial attacks.

### Application
Standard practice before launching any public-facing model version to identify jailbreaks or toxic tendencies.

### Risks
Expensive and slow; it is impossible to find all possible attack vectors in probabilistic systems.`,

  // --- RESEARCH & MODELING ---
  'rlhf': `### Definition
Reinforcement Learning from Human Feedback (RLHF) uses human "votes" to teach a model what a good, safe, and helpful answer looks like.

### Application
The reason why modern models are polite and follow instructions rather than just generating random text.

### Risks
Models might learn to "please" the human (sycophancy) rather than being factually correct.`,

  'multi-modal-arch': `### Definition
Multi-Modal Architectures allow models to "see," "hear," and "read" simultaneously using unified cross-modal embedding spaces.

### Application
Video search, medical imaging paired with notes, and accessibility tools for the visually impaired.

### Risks
Significantly higher complexity in training and higher inference costs due to larger input data.`,

  'knowledge-distillation': `### Definition
Knowledge Distillation compresses a large "Teacher" model into a small "Student" model that mimics its logic for cost-effective use.

### Application
Creating fast, internal versions of massive models that can run on smartphones or local servers.

### Risks
The student will always be limited by the teacher's knowledge; quality loss is inevitable during compression.`,

  // --- DATA ENGINEERING ---
  'zk-data-verification': `### Definition
Zero-Knowledge (ZK) Data Verification uses cryptography to prove properties of a dataset (e.g., "this data is not biased") without showing the actual data points to the auditor.

### Application
Auditing models in highly regulated sectors like medical research where raw data cannot be shared due to privacy laws.

### Risks
Extremely high mathematical complexity; slow proof generation times.`,

  'neuromorphic-data': `### Definition
Neuromorphic Data refers to data streams that are asynchronous and event-based, mimicking biological sensory input rather than periodic frames.

### Application
Edge AI devices like smart sensors and low-power cameras that only process changes in their environment.

### Risks
Requires specialized silicon (NPU) to be energy-efficient; limited software libraries compared to standard GPU stacks.`,

  'data-observability-lineage': `### Definition
Data Observability tracks the journey of data from raw source to model input, ensuring it is clean, correctly formatted, and non-biased.

### Application
Crucial for debugging: finding exactly which bad data point caused the AI to fail in production.

### Risks
Implementing deep lineage across an entire company is a massive engineering effort with high metadata storage costs.`,

  'synthetic-data': `### Definition
Synthetic Data is information generated by one AI model to train another, used when real-world data is scarce or too sensitive.

### Application
Training self-driving cars on millions of rare crash scenarios that don't happen often in reality.

### Risks
Model Collapse: if models only learn from other models, they can become delusional and lose contact with reality.`,

  // --- CONCEPTS ---
  'hallucination': `### Definition
Hallucination is when an AI provides a factually wrong answer with high confidence, typically due to probabilistic pattern-matching.

### Application
A critical challenge for customer support bots that might make up fake policies or product features.

### Risks
Major legal and safety risks in high-stakes fields like medicine or finance.`,

  'overfitting': `### Definition
Overfitting is when a model memorizes its training data too well but fails to solve brand new problems it hasn't seen.

### Application
The reason why we test models on "holdout" data to ensure they've actually learned the underlying logic.

### Risks
Excellent "lab" results but total failure when it meets real, unpredictable humans.`,

  'underfitting': `### Definition
Underfitting occurs when a machine learning model is too simple to capture the underlying structure of the data. It happens when the model has high bias and low variance, failing to learn even the basic patterns in the training set.

### Application
Identifying underfitting is a critical step in the iterative process of model development, signaling the need for more complex architectures, better features, or longer training times.

### Risks
Results in poor performance on both training and testing datasets; the model essentially provides no predictive value and fails to achieve business objectives.`,

  'hitl-design': `### Definition
Human-in-the-loop (HITL) Design integrates human review into the AI lifecycle, providing reinforcement (RLHF) and validating edge cases.

### Application
Building trust in high-stakes systems like autonomous driving or automated legal sentencing.

### Risks
Human reviewers introduce their own biases; scaling human review is expensive and slow.`,

  'ai-roi-modeling': `### Definition
AI ROI Modeling is the financial framework for calculating the return on AI projects, comparing compute costs to operational value.

### Application
Helping executives decide whether to build a custom model or use an expensive third-party API.

### Risks
AI value is often intangible (e.g., user happiness) and hard to measure in raw dollars.`,

  'green-ai': `### Definition
Green AI focuses on the sustainability of AI by measuring carbon footprints and optimizing for better power usage (PUE).

### Application
Corporate sustainability reporting and choosing cloud regions with higher renewable energy mixes.

### Risks
Energy-efficient hardware can be more expensive; there is a trade-off between accuracy and power.`,

  'mcp': `### Definition
Model Context Protocol (MCP) is an open standard for universal integration between AI models and their data tools/sources.

### Application
Standardizing connectors for tools like Slack or Drive that work across Anthropic, OpenAI, and others.

### Risks
Security risks if permissions are too broad; still an emerging standard with potential breaking changes.`,

  'rag': `### Definition
Retrieval-Augmented Generation (RAG) combines LLMs with external data retrieval to provide accurate, grounded answers.

### Application
Corporate wikis and support bots that must cite their sources accurately.

### Risks
System is only as good as the search step; bad retrieval leads to confident misinformation.`,

  'graph-rag': `### Definition
GraphRAG uses Knowledge Graphs to capture complex entity relationships that standard vector search misses.

### Application
Advanced business intelligence mapping connections between diverse people, projects, and outcomes.

### Risks
Technically complex and expensive to maintain compared to standard flat-vector RAG.`,

  'prompt-chaining': `### Definition
Prompt Chaining splits a complex task into a sequence of smaller LLM calls where one output feeds the next input.

### Application
Structured data extraction where one step cleans text and the next parses it into JSON.

### Risks
Significantly increases latency and costs; errors in early stages ruin the entire output.`,

  'tool-use': `### Definition
Tool Use (Function Calling) allows models to interact with the world by generating structured arguments for API calls.

### Application
A personal assistant that can book a flight or update a calendar via authorized third-party APIs.

### Risks
Security vulnerabilities if given access to destructive actions without human confirmation.`,

  'modular-ai': `### Definition
Modular AI designs systems as swappable components (Logic, Retrieval, Guardrails) vs. a monolithic model.

### Application
Enterprise systems that need to swap out underlying models (GPT-4 to Claude) without a total rewrite.

### Risks
Increased engineering complexity in managing compatibility between modular versions.`,

  'semantic-similarity': `### Definition
Semantic Similarity measures concept "closeness" mathematically using vectors rather than exact keyword matches.

### Application
Powering search engines that find "citrus" when a user searches for "orange."

### Risks
Some concepts are mathematically close but logically different (e.g., "Not good" and "Good").`,

  'feature-store': `### Definition
A Feature Store is a shared catalog ensuring identical data points are used for both model training and production.

### Application
Used by companies like Uber to ensure "delivery time" data is consistent across their apps.

### Risks
High initial setup cost and ongoing engineering maintenance.`,

  'data-versioning': `### Definition
Data Versioning is "Git for Data," creating a record of exactly what training data looked like at a specific time.

### Application
Crucial for audits in regulated fields to prove why a model made a specific decision.

### Risks
Storage requirements can explode if delta-tracking is not used efficiently.`,

  'automated-retraining': `### Definition
Automated Retraining pipelines kick off new training sessions based on time triggers or performance alerts.

### Application
Ensuring a product recommendation engine stays "fresh" with the latest shopping trends every night.

### Risks
Can lead to catastrophic forgetting of old, critical rules while learning new trends.`,

  'experiment-tracking': `### Definition
Experiment Tracking logs every detail of a training run, including hyperparameters and code versions.

### Application
Used by researchers to compare 100 versions of a model to find the best performer.

### Risks
Logging too much data can lead to high storage costs and analysis paralysis.`,

  'llmops': `### Definition
LLMOps manages the lifecycle of GenAI, including prompt versioning, vector DBs, and token costs.

### Application
Moving a prototype to a reliable enterprise product that doesn't break on model updates.

### Risks
High operational complexity in a fast-moving tool landscape.`,

  'eval-harness': `### Definition
An Evaluation Harness is an automated suite testing models against benchmarks to measure accuracy improvements.

### Application
CI/CD for AI to ensure a system prompt tweak doesn't break the summary quality.

### Risks
Models might "game" the test rather than actually getting smarter for real users.`,

  'model-governance-compliance': `### Definition
Model Governance is the set of rules and audit trails ensuring AI is safe, ethical, and follows laws like the EU AI Act.

### Application
Necessary for any AI released in Europe or used in hiring and medical diagnosis.

### Risks
High administrative overhead can slow down innovation cycles.`,

  'constitutional-ai': `### Definition
Constitutional AI trains models using a set of rules ("Constitution") to self-critique and align with human values.

### Application
Building safe-by-design models that require less human feedback (RLHF).

### Risks
The "Constitution" may reflect the biases of the engineering team that wrote it.`,

  'ai-alignment': `### Definition
AI Alignment ensures a model's goals match human intent, preventing unintended harm from a misaligned objective.

### Application
The core focus for safety research labs preventing "goal-hacking" by advanced models.

### Risks
Extremely difficult to define human values mathematically.`,

  'data-privacy-dp': `### Definition
Differential Privacy adds mathematical noise to data to protect individual privacy while learning broad patterns.

### Application
Training AI on health records without compromising patient identities.

### Risks
Too much noise reduces accuracy; too little noise fails to protect privacy.`,

  'bias-mitigation': `### Definition
Bias Mitigation involves detecting and reducing social biases in AI through better data or training algorithms.

### Application
Auditing recruitment AI to ensure fairness across all demographic groups.

### Risks
Defining "fairness" is difficult and varies significantly across cultures.`,

  'dpo': `### Definition
Direct Preference Optimization (DPO) is a stable alternative to RLHF that aligns models using human choices without a reward model.

### Application
Faster model alignment for specialized domain models like Legal or Finance.

### Risks
Can lead to over-alignment where the model becomes too timid to answer harmless questions.`,

  'finetuning': `### Definition
Fine-tuning takes a smart general model and adapts it to a specific dataset or specialized industry knowledge.

### Application
Training a model to strictly follow a company’s proprietary medical style.

### Risks
Expensive; carries the risk of "catastrophic forgetting" of general reasoning.`,

  'transformers': `### Definition
The Transformer is the foundational architecture of modern AI, utilizing "Attention" to process whole sentences at once.

### Application
The "Brain" architecture inside GPT-4, Gemini, and Claude.

### Risks
Quadratic complexity: processing long text requires exponentially more compute.`,

  'moe': `### Definition
Mixture of Experts (MoE) activates only a fraction of parameters for each query, making it fast and smart simultaneously.

### Application
Powers massive models like Mixtral 8x7B for efficient serving.

### Risks
Extremely complex to train and load-balance across distributed systems.`,

  'peft-lora-adv': `### Definition
Low-Rank Adaptation (LoRA) is an efficient way to tune models by only updating a tiny subset (1%) of parameters.

### Application
Customizing massive models to a specific brand voice on a single consumer GPU.

### Risks
Might not capture deeply complex new concepts as well as full training.`,

  'federated-learning': `### Definition
Federated Learning trains AI across decentralized devices without ever moving raw private data to the cloud.

### Application
Privacy-first training across different hospitals or for keyboard next-word prediction.

### Risks
High communication overhead; vulnerable to "poisoning" attacks from local devices.`,

  'real-time-inference-design': `### Definition
Real-Time Inference Design focuses on architecting systems for sub-100ms responses using caching and cascading.

### Application
Critical for voice assistants or real-time code completion where latency is key.

### Risks
Caching can lead to stale answers; cascading logic is hard to monitor.`,

  'vector-db': `### Definition
Vector Databases store text as "meaning" (vectors) for high-speed semantic search in RAG systems.

### Application
Searching millions of documents by concept rather than exact keywords.

### Risks
High VRAM usage and technical management complexity at scale.`,

  'gpu-clusters': `### Definition
GPU Clusters are interconnected networks of graphics cards providing the raw power for training frontier models.

### Application
Essential infrastructure for building models like Llama-3 or GPT-4o.

### Risks
Extremely high energy usage and massive capital expenditure.`,

  'context-caching': `### Definition
Context Caching stores pre-computed prompts to save money when the same massive context is reused.

### Application
Lowering the cost of a chatbot referencing a 1,000-page manual for every user.

### Risks
Complexity in keeping the cache updated as documents change.`,

  'quantization-adv': `### Definition
Quantization reduces weight precision (e.g., 32-bit to 4-bit), making models run 4x-10x faster with less memory.

### Application
Running smart models on low-power devices like cameras, drones, or offline laptops.

### Risks
Extreme quantization can lead to reasoning failure or incoherent output.`,

  'inference-latency': `### Definition
Inference Latency is the time for a model to start responding, usually measured in milliseconds.

### Application
Critical for user experience in chat or real-time voice applications.

### Risks
High latency leads to user frustration and high bounce rates.`,

  'inference-optimization': `### Definition
Inference Optimization includes tricks like Batching and Speculative Decoding to make serving cheaper.

### Application
Used by cloud providers to serve millions of users while keeping costs low.

### Risks
Some optimizations can subtly change model output in hard-to-detect ways.`,

  'semantic-chunking': `### Definition
Semantic Chunking breaks documents into pieces based on topic boundaries rather than word counts.

### Application
Ensuring RAG retrieval gives the AI the "full context" of a specific idea.

### Risks
Requires an extra AI-powered step, adding cost and latency to data pipelines.`,

  'data-leakage': `### Definition
Data Leakage is a fatal flaw where test data (future info) is accidentally included in the training set.

### Application
A stock predictor that "saw" tomorrow's prices during training, making it look fake-perfect.

### Risks
Total failure in the real world: the model looks like a genius in the lab but is useless live.`,

  'data-distillation': `### Definition
Data Distillation extracts the most essential "pure" knowledge from a massive dataset for faster training.

### Application
Preparing high-quality data for training small "Student" models for mobile use.

### Risks
Over-distilling can remove rare edge cases needed for safety and robustness.`,

  'model-drift': `### Definition
Model Drift is the slow decay of accuracy over time because the real world has changed since training.

### Application
Monitoring fraud AI to ensure it catches 2024 scams that didn't exist in 2021.

### Risks
Silent failure where the model keeps working but gives increasingly bad advice.`,

  'context-window': `### Definition
The Context Window is the "short-term memory" limit of an AI in a single conversation.

### Application
Determining if a model can read a whole book in one go without forgetting the start.

### Risks
Long windows are expensive and can significantly slow down model responses.`,

  'xai': `### Definition
Explainability (XAI) makes "black box" AI decisions transparent so humans can understand the "why."

### Application
Mandatory in banking to explain why a loan was rejected by an algorithm.

### Risks
The most accurate models are often the hardest to explain simply.`,

  'agent-loops': `### Definition
Agentic Loops are "Think-Act-Observe" cycles allowing AI to solve complex, multi-step problems autonomously.

### Application
Coding agents that write, run, and fix code until it passes all tests.

### Risks
Agents can enter infinite loops, consuming thousands of dollars in tokens if not bounded.`,

  'catastrophic-forgetting': `### Definition
Catastrophic Forgetting happens when an AI learns something new but completely "wipes" its old knowledge.

### Application
The main challenge in building AI that can learn continuously over time.

### Risks
Updating a model for Spanish might accidentally break its ability to write code.`,

  'multi-agent': `### Definition
Multi-Agent Systems coordinate specialized agents (Researcher, Coder, Reviewer) on one shared project.

### Application
Full software development where one writes, one tests, and one reviews the PR.

### Risks
Communication "noise" between agents can lead to cascading errors and high costs.`
};