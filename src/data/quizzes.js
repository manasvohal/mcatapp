export const QUIZ_QUESTIONS = [
  {
    id: 1,
    subject: 'Biology',
    topic: 'Cellular Signaling',
    question:
      'Which of the following is the primary role of second messengers in G protein-coupled receptor signaling?',
    options: [
      { id: 'A', text: 'Directly activate transcription factors in the nucleus' },
      {
        id: 'B',
        text: 'Amplify and relay the signal from the receptor to intracellular targets',
      },
      { id: 'C', text: 'Degrade the ligand after receptor binding' },
      { id: 'D', text: 'Transport the receptor to the plasma membrane' },
    ],
    correctAnswer: 'B',
    explanation:
      'Second messengers like cAMP and IP₃ amplify and relay signals from activated GPCRs to downstream effectors, allowing a small number of ligand-receptor interactions to produce a large cellular response.',
  },
  {
    id: 2,
    subject: 'Biochemistry',
    topic: 'Enzyme Kinetics',
    question: 'A competitive inhibitor increases which of the following kinetic parameters?',
    options: [
      { id: 'A', text: 'Vmax only' },
      { id: 'B', text: 'Km only' },
      { id: 'C', text: 'Both Km and Vmax' },
      { id: 'D', text: 'Neither Km nor Vmax' },
    ],
    correctAnswer: 'B',
    explanation:
      'Competitive inhibitors bind the active site and increase the apparent Km (more substrate needed to reach half-Vmax), but Vmax remains unchanged because the inhibitor can be outcompeted at high substrate concentrations.',
  },
  {
    id: 3,
    subject: 'Physics',
    topic: 'Optics',
    question: 'A concave mirror with focal length 10 cm has an object placed 5 cm in front of it. The image formed is:',
    options: [
      { id: 'A', text: 'Real, inverted, and magnified' },
      { id: 'B', text: 'Real, upright, and reduced' },
      { id: 'C', text: 'Virtual, upright, and magnified' },
      { id: 'D', text: 'Virtual, inverted, and reduced' },
    ],
    correctAnswer: 'C',
    explanation:
      'When an object is placed between the focal point and a concave mirror (do < f), the image is virtual, upright, and magnified. Using 1/f = 1/do + 1/di: 1/10 = 1/5 + 1/di → di = −10 cm (virtual, behind mirror).',
  },
  {
    id: 4,
    subject: 'General Chem',
    topic: 'Acid-Base Chemistry',
    question: 'Which buffer system is primarily responsible for maintaining blood pH?',
    options: [
      { id: 'A', text: 'Phosphate buffer (H₂PO₄⁻/HPO₄²⁻)' },
      { id: 'B', text: 'Bicarbonate buffer (H₂CO₃/HCO₃⁻)' },
      { id: 'C', text: 'Protein buffer (histidine residues)' },
      { id: 'D', text: 'Ammonia buffer (NH₃/NH₄⁺)' },
    ],
    correctAnswer: 'B',
    explanation:
      'The bicarbonate buffer system (H₂CO₃/HCO₃⁻) is the primary physiological buffer. CO₂ is regulated by the lungs and HCO₃⁻ by the kidneys, making it highly versatile for maintaining blood pH at 7.4.',
  },
  {
    id: 5,
    subject: 'Psychology',
    topic: 'Memory',
    question: 'Which type of long-term memory is impaired in a patient with damage to the hippocampus?',
    options: [
      { id: 'A', text: 'Procedural memory (how to ride a bike)' },
      { id: 'B', text: 'Implicit memory (conditioned responses)' },
      { id: 'C', text: 'Explicit/declarative memory (facts and events)' },
      { id: 'D', text: 'Emotional memory (fear responses)' },
    ],
    correctAnswer: 'C',
    explanation:
      'The hippocampus is critical for the formation and retrieval of explicit (declarative) memory — episodic (events) and semantic (facts). Procedural and implicit memories are largely hippocampus-independent.',
  },
  {
    id: 6,
    subject: 'Biology',
    topic: 'Genetics',
    question: 'In a dihybrid cross between two organisms heterozygous for both traits (AaBb × AaBb), what fraction of offspring will show BOTH dominant traits?',
    options: [
      { id: 'A', text: '1/16' },
      { id: 'B', text: '3/16' },
      { id: 'C', text: '9/16' },
      { id: 'D', text: '12/16' },
    ],
    correctAnswer: 'C',
    explanation:
      'In a dihybrid cross, the 9:3:3:1 phenotypic ratio means 9/16 offspring show both dominant traits (A_B_). This follows from independent assortment: P(A_) × P(B_) = 3/4 × 3/4 = 9/16.',
  },
  {
    id: 7,
    subject: 'Biochemistry',
    topic: 'Metabolism',
    question: 'Which enzyme commits glucose-6-phosphate irreversibly to glycolysis?',
    options: [
      { id: 'A', text: 'Hexokinase' },
      { id: 'B', text: 'Phosphoglucose isomerase' },
      { id: 'C', text: 'Phosphofructokinase-1 (PFK-1)' },
      { id: 'D', text: 'Pyruvate kinase' },
    ],
    correctAnswer: 'C',
    explanation:
      'PFK-1 catalyzes the conversion of fructose-6-phosphate to fructose-1,6-bisphosphate — the committed, rate-limiting, and irreversible step of glycolysis. It\'s the key regulatory enzyme, inhibited by ATP/citrate and activated by AMP/ADP.',
  },
  {
    id: 8,
    subject: 'Physics',
    topic: 'Fluid Dynamics',
    question: 'Blood flows through a vessel that suddenly narrows (stenosis). According to Bernoulli\'s principle, what happens to the blood pressure at the stenosis?',
    options: [
      { id: 'A', text: 'Pressure increases because the vessel is narrower' },
      { id: 'B', text: 'Pressure decreases because velocity increases' },
      { id: 'C', text: 'Pressure stays the same due to conservation of mass' },
      { id: 'D', text: 'Pressure increases because turbulence increases' },
    ],
    correctAnswer: 'B',
    explanation:
      'By Bernoulli\'s principle, P + ½ρv² = constant. At the stenosis, the cross-sectional area decreases, so by continuity (A₁v₁ = A₂v₂), velocity must increase. Therefore, pressure must decrease. This can cause vessel collapse.',
  },
  {
    id: 9,
    subject: 'General Chem',
    topic: 'Thermodynamics',
    question: 'A reaction has ΔH = −100 kJ/mol and ΔS = −200 J/mol·K. At what temperature does the reaction become non-spontaneous?',
    options: [
      { id: 'A', text: 'Below 500 K' },
      { id: 'B', text: 'Above 500 K' },
      { id: 'C', text: 'The reaction is always spontaneous' },
      { id: 'D', text: 'The reaction is never spontaneous' },
    ],
    correctAnswer: 'B',
    explanation:
      'ΔG = ΔH − TΔS. With ΔH = −100,000 J/mol and ΔS = −200 J/mol·K: ΔG = 0 when T = ΔH/ΔS = 100,000/200 = 500 K. Above 500 K, the −TΔS term (positive, since ΔS is negative) dominates, making ΔG positive (non-spontaneous).',
  },
  {
    id: 10,
    subject: 'Biology',
    topic: 'Cell Biology',
    question: 'Which organelle is responsible for post-translational modification and sorting of secretory proteins?',
    options: [
      { id: 'A', text: 'Smooth endoplasmic reticulum' },
      { id: 'B', text: 'Rough endoplasmic reticulum' },
      { id: 'C', text: 'Golgi apparatus' },
      { id: 'D', text: 'Lysosome' },
    ],
    correctAnswer: 'C',
    explanation:
      'The Golgi apparatus receives proteins from the rough ER (via vesicles), performs post-translational modifications (glycosylation, phosphorylation), and sorts proteins to their final destinations: lysosomes, plasma membrane, or secretion.',
  },
];
