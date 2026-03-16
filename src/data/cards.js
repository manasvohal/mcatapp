export const FEED_CARDS = [
  {
    id: '1',
    subject: 'Physics',
    hook: 'Why does a diverging lens ALWAYS form a virtual image?',
    insight:
      'Refracted rays spread out (diverge) away from the principal axis — they can NEVER physically meet on the other side. Your brain traces them backward to a focal point behind the lens. This is why you can\'t project a diverging lens image onto a screen.\n\nKey: The focal length of a diverging lens is always negative in the lens equation (1/f = 1/do + 1/di).',
    takeaway: 'Diverging = Virtual, Upright, Reduced (VUR) — always!',
    readTime: '2 min',
    keyTerms: ['diverging', 'virtual image', 'focal length', 'refraction'],
  },
  {
    id: '2',
    subject: 'Biology',
    hook: 'What triggers the all-or-nothing response in neurons?',
    insight:
      'When a stimulus reaches the threshold potential (approximately −55 mV), voltage-gated Na⁺ channels blast open. Na⁺ rushes in, rapidly depolarizing the membrane to +40 mV.\n\nBelow threshold: no action potential. At or above: full action potential fires. The magnitude of the stimulus does NOT affect AP strength — only frequency changes.',
    takeaway: 'Threshold → all Na⁺ gates open → full AP. Subthreshold = nothing at all.',
    readTime: '2 min',
    keyTerms: ['threshold potential', 'depolarization', 'Na⁺ channels', 'all-or-nothing'],
  },
  {
    id: '3',
    subject: 'Biochemistry',
    hook: 'How does competitive inhibition differ from non-competitive?',
    insight:
      'Competitive inhibitor: Binds the active site. Looks like the substrate. Adding more substrate OUTCOMPETES it.\n→ Km increases (apparent), Vmax stays the SAME.\n\nNon-competitive inhibitor: Binds allosteric site. Doesn\'t care about substrate concentration.\n→ Km stays the SAME, Vmax DECREASES.\n\nMnemonic: Competitive = Km changes, Non-competitive = Vmax changes.',
    takeaway: 'Competitive → ↑Km, same Vmax. Non-competitive → same Km, ↓Vmax.',
    readTime: '3 min',
    keyTerms: ['Km', 'Vmax', 'active site', 'allosteric site', 'enzyme kinetics'],
  },
  {
    id: '4',
    subject: 'Psychology',
    hook: 'Classical vs. Operant Conditioning — what\'s the real difference?',
    insight:
      'Classical (Pavlov): Passive. You pair an automatic response with a new stimulus. Bell + food → salivation. The dog didn\'t choose to salivate.\n\nOperant (Skinner): Active. Behavior is shaped by consequences. Positive reinforcement adds a reward. Negative reinforcement removes something bad. Punishment decreases behavior.\n\nKey: Classical = involuntary reflexes. Operant = voluntary behavior + consequences.',
    takeaway: 'Classical = involuntary, stimulus-response. Operant = voluntary, consequence-driven.',
    readTime: '2 min',
    keyTerms: ['conditioned stimulus', 'reinforcement', 'punishment', 'Pavlov', 'Skinner'],
  },
  {
    id: '5',
    subject: 'Chemistry',
    hook: 'What is Le Chatelier\'s Principle and why does it matter?',
    insight:
      'A system at equilibrium will RESIST changes by shifting to counteract the disturbance.\n\nAdd reactants → shift right (→ products).\nRemove products → shift right.\nIncrease pressure → shift toward fewer moles of gas.\nIncrease temperature → shift toward endothermic direction.\n\nHaber process example: N₂ + 3H₂ ⇌ 2NH₃. High pressure + low temp + iron catalyst = maximum yield.',
    takeaway: 'Stress → equilibrium shifts to relieve the stress. Every time.',
    readTime: '2 min',
    keyTerms: ['equilibrium', 'Le Chatelier', 'shift', 'concentration', 'pressure'],
  },
  {
    id: '6',
    subject: 'Biology',
    hook: 'What are the key steps of cellular respiration?',
    insight:
      'Glycolysis (cytoplasm): Glucose → 2 pyruvate. Net 2 ATP, 2 NADH.\n\nPyruvate Oxidation (mitochondrial matrix): 2 pyruvate → 2 Acetyl-CoA + 2 CO₂.\n\nKrebs Cycle (matrix): 2 turns. Produces 6 NADH, 2 FADH₂, 2 ATP, 4 CO₂.\n\nElectron Transport Chain (inner membrane): NADH/FADH₂ → ~32–34 ATP. O₂ = final electron acceptor → H₂O.',
    takeaway: 'Glycolysis → Pyruvate Ox → Krebs → ETC. Total ~36-38 ATP per glucose.',
    readTime: '3 min',
    keyTerms: ['glycolysis', 'Krebs cycle', 'ETC', 'ATP', 'NADH', 'FADH₂'],
  },
  {
    id: '7',
    subject: 'Biochemistry',
    hook: 'Which amino acids carry a POSITIVE charge at physiological pH?',
    insight:
      'The positively charged (basic) amino acids at pH 7.4:\n\nLysine (K) — pKa ~10.5, protonated -NH₃⁺\nArginine (R) — pKa ~12.5, guanidinium group\nHistidine (H) — pKa ~6.0, partially protonated (can act as buffer!)\n\nMnemonic: HARKs — Histidine, Arginine, lysine (K). Histidine is the only one that acts as a physiological buffer near pH 7.',
    takeaway: 'Basic AA = Lysine, Arginine, Histidine (His is the pH buffer near physiological pH).',
    readTime: '2 min',
    keyTerms: ['pKa', 'lysine', 'arginine', 'histidine', 'buffer', 'protonation'],
  },
  {
    id: '8',
    subject: 'General Chem',
    hook: 'How do you calculate pH from Ka quickly?',
    insight:
      'For a weak acid HA: Ka = [H⁺][A⁻] / [HA]\n\nShortcut: pH = ½(pKa − log[HA])\nOr: [H⁺] = √(Ka × C)\nThen pH = −log[H⁺]\n\nExample: 0.1 M acetic acid (Ka = 1.8 × 10⁻⁵)\n[H⁺] = √(1.8×10⁻⁵ × 0.1) = √(1.8×10⁻⁶) ≈ 1.34×10⁻³\npH ≈ 2.87\n\nFor strong acids: pH = −log[HA] directly.',
    takeaway: 'Weak acid: [H⁺] = √(Ka × C). Strong acid: pH = −log[concentration].',
    readTime: '3 min',
    keyTerms: ['Ka', 'pKa', 'weak acid', 'pH calculation', 'Henderson-Hasselbalch'],
  },
  {
    id: '9',
    subject: 'Biology',
    hook: 'How does the Na⁺/K⁺ ATPase pump maintain the resting potential?',
    insight:
      'The pump is ANTIPORT: moves 3 Na⁺ OUT and 2 K⁺ IN per ATP hydrolyzed. Net charge exported = +1 per cycle → electrogenic (creates slight negative inside).\n\nThis maintains:\n• High Na⁺ outside, low inside\n• High K⁺ inside, low outside\n• Resting membrane potential of ~−70 mV\n\nInhibited by ouabain. Requires Mg²⁺-ATP. Secondary active transport (e.g., glucose-Na⁺ cotransport) piggybacks on the gradient it creates.',
    takeaway: '3 Na⁺ out, 2 K⁺ in per ATP. Creates electrochemical gradients essential for nerve/muscle function.',
    readTime: '2 min',
    keyTerms: ['Na⁺/K⁺ ATPase', 'antiport', 'resting potential', 'electrogenic', 'active transport'],
  },
  {
    id: '10',
    subject: 'Psychology',
    hook: 'What is Freud\'s structural model: Id, Ego, and Superego?',
    insight:
      'Id: Primitive, unconscious. Operates on the pleasure principle — wants immediate gratification. No morality, no logic.\n\nEgo: The mediator. Operates on the reality principle. Balances id demands with real-world constraints. Uses defense mechanisms.\n\nSuperego: Moral compass. Internalized social rules and parental values. Creates guilt and pride. Conflicts with id.\n\nFreud believed neurosis = unresolved conflict between these three structures.',
    takeaway: 'Id = wants, Superego = morals, Ego = referee between the two.',
    readTime: '2 min',
    keyTerms: ['id', 'ego', 'superego', 'pleasure principle', 'reality principle', 'defense mechanisms'],
  },
  {
    id: '11',
    subject: 'Physics',
    hook: 'What is Bernoulli\'s Principle and where does it appear on the MCAT?',
    insight:
      'Bernoulli\'s equation: P + ½ρv² + ρgh = constant\n\nWhere fluid moves FASTER → pressure DECREASES. Classic examples:\n• Airplane wings (faster air above → lift)\n• Venturi effect (narrow pipe → faster flow → lower pressure)\n• Cardiovascular: stenosis → faster blood → lower pressure (counterintuitive!)\n\nFor MCAT: If a vessel narrows (stenosis), blood accelerates and pressure drops. This can cause vessel collapse — a key clinical concept.',
    takeaway: 'Faster flow = lower pressure. Stenosis paradox: narrower vessel → higher velocity → lower pressure.',
    readTime: '3 min',
    keyTerms: ['Bernoulli', 'fluid dynamics', 'pressure', 'velocity', 'stenosis', 'venturi'],
  },
  {
    id: '12',
    subject: 'Biochemistry',
    hook: 'What is the REAL difference between SN1 and SN2 reactions?',
    insight:
      'SN2: Backside attack, ONE step, inversion of configuration (Walden inversion). Rate depends on BOTH substrate and nucleophile concentrations. Favors primary substrates + strong nucleophiles + polar aprotic solvents (DMSO, acetone).\n\nSN1: TWO steps, carbocation intermediate, racemization (mix of products). Rate depends ONLY on substrate. Favors tertiary substrates + weak nucleophiles + polar protic solvents (water, alcohols).\n\nMnemonic: SN2 = 2 molecules in rate law = concerted. SN1 = 1 molecule = slow carbocation step.',
    takeaway: 'SN2 = concerted, inversion, primary. SN1 = stepwise, racemization, tertiary.',
    readTime: '3 min',
    keyTerms: ['SN1', 'SN2', 'carbocation', 'nucleophile', 'inversion', 'racemization'],
  },
];

export const QUIZ_BREAK = {
  id: 'quiz_break',
  type: 'quiz',
  question: 'During an action potential, what happens to membrane permeability FIRST?',
  options: [
    { id: 'A', text: 'K⁺ permeability increases, causing depolarization' },
    { id: 'B', text: 'Na⁺ permeability dramatically increases, causing depolarization' },
    { id: 'C', text: 'Cl⁻ permeability decreases, causing hyperpolarization' },
    { id: 'D', text: 'Ca²⁺ channels open, triggering neurotransmitter release' },
  ],
  correctAnswer: 'B',
  explanation: 'Voltage-gated Na⁺ channels open first when threshold is reached, flooding the cell with Na⁺ and rapidly depolarizing the membrane from −70 mV to +40 mV.',
};
