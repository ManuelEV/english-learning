import type { Unit } from '../types'

const unit: Unit = {
  id: 'c1-nuance',
  line: 'c1',
  title: 'Hedging & the Subjunctive',
  subtitle: 'Matiza tus afirmaciones y haz recomendaciones formales con precisión y diplomacia.',
  emoji: '🎚️',
  minutes: 15,
  steps: [
    {
      kind: 'hook',
      emoji: '🎓',
      title: 'Afirmar sin exagerar',
      text: 'Escribes un informe: «Social media causes anxiety». ¿Siempre? ¿A todos? Un lector crítico lo rechazará. Con **hedging** ajustas la fuerza de lo que dices y tu texto gana credibilidad.',
      example: {
        en: 'Heavy social media use **tends to** increase anxiety among teenagers.',
        es: 'El uso intensivo de redes sociales tiende a aumentar la ansiedad en los adolescentes.',
        note: 'Versión B2: Social media causes anxiety.',
      },
    },
    {
      kind: 'formula',
      title: 'Hedging: cómo bajar el volumen',
      text: 'Hay tres maneras: un **verbo** que suaviza (tend to, seem to, appear to), una **frase introductoria** impersonal o un **adverbio** como arguably o somewhat.',
      rows: [
        {
          label: 'Verbo + to',
          parts: [
            { text: 'Prices', caption: 'sujeto', tone: 'ink' },
            { text: 'tend / seem / appear', caption: 'verbo que matiza', tone: 'teal' },
            { text: 'to rise', caption: 'to + base', tone: 'coral' },
            { text: 'in summer', tone: 'ink' },
          ],
        },
        {
          label: 'Frase introductoria',
          parts: [
            { text: 'It could be argued', caption: 'impersonal', tone: 'teal' },
            { text: 'that', tone: 'violet' },
            { text: 'the law is outdated', caption: 'afirmación', tone: 'ink' },
          ],
        },
        {
          label: 'Adverbio',
          parts: [
            { text: 'The results are', tone: 'ink' },
            { text: 'somewhat', caption: 'grado', tone: 'teal' },
            { text: 'disappointing', caption: 'adjetivo', tone: 'coral' },
          ],
        },
      ],
      examples: [
        {
          en: 'The new policy **appears to be** working.',
          es: 'La nueva política parece estar funcionando.',
        },
        {
          en: 'This is **arguably** the best film of the decade.',
          es: 'Podría decirse que esta es la mejor película de la década.',
          note: 'Arguably = «se puede sostener que»; no significa «discutiblemente».',
        },
      ],
    },
    {
      kind: 'examples',
      title: 'Hedging en acción',
      text: 'Fíjate en los infinitivos: **to be + -ing** para algo en progreso y **to have + participio** para algo anterior.',
      items: [
        {
          en: 'Customers **seem to prefer** the cheaper option.',
          es: 'Los clientes parecen preferir la opción más barata.',
        },
        {
          en: 'The company **appears to have underestimated** the costs.',
          es: 'La empresa parece haber subestimado los costos.',
          note: 'Algo anterior → to have + participio.',
        },
        {
          en: '**It could be argued that** remote work has changed our cities.',
          es: 'Podría argumentarse que el trabajo remoto ha cambiado nuestras ciudades.',
        },
        {
          en: 'I found the ending **somewhat** confusing.',
          es: 'El final me pareció algo confuso.',
          note: 'Somewhat = «un tanto», más formal que «a bit».',
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Directo vs matizado',
      text: 'Ninguno es «mejor»: depende de **cuánta evidencia** tienes y de **a quién** le hablas.',
      left: {
        label: 'Directo',
        tone: 'coral',
        points: [
          'Presenta la idea como un hecho absoluto',
          'Útil para datos comprobados',
          'En opiniones puede sonar arrogante o brusco',
        ],
        example: {
          en: 'Your proposal is unrealistic.',
          es: 'Tu propuesta es poco realista.',
        },
      },
      right: {
        label: 'Matizado',
        tone: 'teal',
        points: [
          'Deja espacio para excepciones',
          'Típico de textos académicos y críticas diplomáticas',
          'Protege tu credibilidad si te equivocas',
        ],
        example: {
          en: 'Your proposal **seems somewhat** unrealistic.',
          es: 'Tu propuesta parece un tanto poco realista.',
        },
      },
    },
    {
      kind: 'formula',
      title: 'El subjuntivo formal',
      text: 'Tras verbos y adjetivos de **recomendación o exigencia**, el verbo va en **forma base** para todas las personas: sin -s, sin «to», sin pasado. Con **It’s high time** pasa otra cosa: va el **pasado**, aunque hables del presente.',
      rows: [
        {
          label: 'Verbo + that',
          parts: [
            { text: 'I suggest', caption: 'suggest · recommend · insist · demand', tone: 'teal' },
            { text: 'that', tone: 'violet' },
            { text: 'he', caption: 'sujeto', tone: 'ink' },
            { text: 'be', caption: 'forma base', tone: 'coral' },
            { text: 'present', tone: 'ink' },
          ],
        },
        {
          label: 'It is + adjetivo + that',
          parts: [
            { text: 'It is essential', caption: 'essential · vital · important', tone: 'teal' },
            { text: 'that', tone: 'violet' },
            { text: 'she', caption: 'sujeto', tone: 'ink' },
            { text: 'attend', caption: 'forma base', tone: 'coral' },
          ],
        },
        {
          label: "It's high time",
          parts: [
            { text: "It's high time", caption: 'ya es hora de que', tone: 'amber' },
            { text: 'we', caption: 'sujeto', tone: 'ink' },
            { text: 'left', caption: 'pasado', tone: 'coral' },
          ],
        },
      ],
      examples: [
        {
          en: 'The board demanded that the data **not be** shared.',
          es: 'La junta exigió que los datos no se compartieran.',
          note: 'Negativa: not + forma base, sin «do».',
        },
        {
          en: "It's high time you **told** her the truth.",
          es: 'Ya es hora de que le digas la verdad.',
          note: 'Pasado con sentido presente: debiste hacerlo hace rato.',
        },
      ],
    },
    {
      kind: 'trap',
      title: 'Trampa 1: suggest + to',
      wrong: 'I suggest you to talk to your manager.',
      right: 'I suggest (that) you talk to your manager.',
      why: 'Por analogía con «want you to» o «advise you to», agregamos «to». Pero **suggest**, **recommend**, **insist** y **demand** van con that + sujeto + forma base. También puedes decir «I suggest talking to your manager».',
    },
    {
      kind: 'trap',
      title: 'Trampa 2: «ya es hora de que…»',
      wrong: "It's high time the company invests in training.",
      right: "It's high time the company invested in training.",
      why: 'En español usamos presente de subjuntivo («ya es hora de que invierta»), y lo calcamos con un presente. En inglés, después de **It’s (high) time + sujeto** va el **pasado**. Sin sujeto, usa el infinitivo: It’s time to invest.',
    },
    {
      kind: 'tips',
      title: 'Registro: precisión sin exagerar',
      text: 'Matizar es señal de madurez lingüística, pero todo tiene su medida.',
      items: [
        {
          emoji: '📚',
          title: 'Hedging: sí, pero poco',
          text: 'Un matiz por afirmación. «It could possibly be argued that it may perhaps seem…» suena evasivo, no cuidadoso.',
        },
        {
          emoji: '🏛️',
          title: 'Subjuntivo: muy formal',
          text: 'Perfecto para actas, contratos y correos serios. En inglés británico también oirás «should»: I suggest that he should be present.',
        },
        {
          emoji: '☕',
          title: 'En una charla',
          text: '«I suggest that he be informed» suena solemne entre amigos. Di «I think we should tell him».',
        },
        {
          emoji: '⏰',
          title: 'High time es de todos los días',
          text: "It's about time you called! se usa mucho al hablar, a menudo con un tono de reproche.",
        },
      ],
    },
    {
      kind: 'check',
      question: 'Redactas el acta de una reunión formal. ¿Qué forma necesita?',
      sentence: 'The director insisted that every employee ___ the training.',
      options: ['completes', 'complete', 'to complete'],
      answer: 1,
      explain: 'Después de «insist that» va el subjuntivo: forma base para todas las personas, sin -s ni «to» → complete.',
    },
  ],
  exercises: [
    {
      id: 'c1-nuance-1',
      type: 'choice',
      prompt: 'Elige la opción correcta.',
      sentence: 'Prices ___ rise in December, although this is not always the case.',
      options: ['tend', 'tend to', 'are tending'],
      answer: 1,
      explain: '«Tend» siempre va con to + infinitivo y no suele usarse en forma continua: Prices tend to rise.',
    },
    {
      id: 'c1-nuance-2',
      type: 'choice',
      prompt: 'Elige la forma correcta en registro formal.',
      sentence: 'The doctor recommended that he ___ at least eight hours a night.',
      options: ['sleeps', 'to sleep', 'sleep'],
      answer: 2,
      explain: 'Tras «recommend that» va el subjuntivo: la forma base, sin -s aunque el sujeto sea «he», y sin «to».',
    },
    {
      id: 'c1-nuance-3',
      type: 'sort',
      prompt: '¿La oración afirma de forma directa o está matizada (hedging)?',
      categories: ['Directa', 'Matizada'],
      items: [
        { text: 'This policy is a failure.', cat: 0 },
        { text: 'This policy appears to have failed.', cat: 1 },
        { text: 'Remote work increases productivity.', cat: 0 },
        { text: 'Remote work arguably increases productivity.', cat: 1 },
        { text: 'The results prove our theory.', cat: 0 },
        { text: 'The results seem to support our theory.', cat: 1 },
        { text: 'Everyone prefers online classes.', cat: 0 },
        { text: 'Students tend to prefer online classes.', cat: 1 },
      ],
      explain: 'Appear to, arguably, seem to y tend to reducen la fuerza de la afirmación. Sin ellos, la idea se presenta como un hecho absoluto.',
    },
    {
      id: 'c1-nuance-4',
      type: 'gap',
      prompt: 'Completa con la forma correcta del verbo.',
      sentence: "It's high time you ___ looking for a new job.",
      hint: '(start)',
      answers: ['started'],
      explain: 'Después de «It’s high time + sujeto» va el pasado, aunque se hable del presente: ya deberías haber empezado.',
    },
    {
      id: 'c1-nuance-5',
      type: 'order',
      es: 'Es esencial que ella asista a la reunión.',
      words: ['It is', 'essential', 'that', 'she', 'attend', 'the', 'meeting.'],
      distractors: ['attending', 'for'],
      explain: 'Tras «It is essential that» el verbo va en forma base (attend), sin -s. Además, «attend» no lleva preposición: attend the meeting.',
    },
    {
      id: 'c1-nuance-6',
      type: 'error',
      sentence: 'I suggest [you to speak] to your supervisor first.',
      fix: 'you speak',
      explain: '«Suggest» no admite objeto + to. La estructura es suggest (that) + sujeto + forma base: I suggest you speak.',
    },
    {
      id: 'c1-nuance-7',
      type: 'listen',
      text: 'It could be argued that the plan is somewhat risky.',
      es: 'Podría argumentarse que el plan es algo arriesgado.',
      explain: 'Doble matiz: «It could be argued that» presenta la idea como una opinión posible y «somewhat» suaviza el adjetivo.',
    },
    {
      id: 'c1-nuance-8',
      type: 'gap',
      prompt: 'Completa con el subjuntivo formal (una sola palabra).',
      sentence: 'The committee insisted that the report ___ rewritten before publication.',
      answers: ['be', 'should be'],
      explain: 'El subjuntivo de «to be» es «be» para todas las personas. Por eso la pasiva queda «be rewritten», no «is» ni «was rewritten».',
    },
    {
      id: 'c1-nuance-9',
      type: 'choice',
      prompt: 'Elige la opción correcta.',
      sentence: 'The new drug ___ effective in most patients, but further trials are needed.',
      options: ['appears being', 'is appeared to be', 'appears that is', 'appears to be'],
      answer: 3,
      explain: '«Appear» va en voz activa y seguido de to + infinitivo: appears to be. Con «that» se necesitaría «It appears that the drug is…».',
    },
    {
      id: 'c1-nuance-10',
      type: 'error',
      sentence: "It's high time the government [takes] this problem seriously.",
      fix: 'took',
      explain: 'Calco de «ya es hora de que el gobierno tome…». En inglés, «It’s high time + sujeto» exige pasado: took.',
    },
    {
      id: 'c1-nuance-11',
      type: 'rewrite',
      prompt: 'Reescribe la oración empezando con las palabras dadas.',
      source: 'It seems that the company has lost a lot of money.',
      start: 'The company',
      answers: [
        'The company seems to have lost a lot of money',
        'The company appears to have lost a lot of money',
      ],
      explain: 'Al empezar con el sujeto real, «seem» va con infinitivo. Como la pérdida es anterior (has lost), se usa el infinitivo perfecto: to have lost.',
    },
    {
      id: 'c1-nuance-12',
      type: 'rewrite',
      prompt: 'Reporta la orden en registro formal, empezando con las palabras dadas.',
      source: 'The manager said: "Everyone must submit the form by Friday."',
      start: 'The manager demanded that',
      answers: [
        'The manager demanded that everyone submit the form by Friday',
        'The manager demanded that everyone should submit the form by Friday',
      ],
      explain: 'Tras «demand that» va el subjuntivo: forma base (submit), aunque «everyone» sea singular y el verbo principal esté en pasado.',
    },
  ],
}

export default unit
