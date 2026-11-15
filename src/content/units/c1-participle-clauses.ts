import type { Unit } from '../types'

const unit: Unit = {
  id: 'c1-participle-clauses',
  line: 'c1',
  title: 'Participle Clauses',
  subtitle: 'Condensa dos ideas en una sola oración fluida, como en informes y textos bien escritos.',
  emoji: '🧵',
  minutes: 15,
  steps: [
    {
      kind: 'hook',
      emoji: '🧳',
      title: 'Menos palabras, más estilo',
      text: 'Escribes una reseña de viaje. «Because she didn’t know the city, she took a taxi» funciona, pero es largo. Un **participle clause** elimina la conjunción y el sujeto repetido, y la frase gana ritmo.',
      example: {
        en: '**Not knowing** the city, she took a taxi.',
        es: 'Como no conocía la ciudad, tomó un taxi.',
        note: "Versión B2: Because she didn't know the city, she took a taxi.",
      },
    },
    {
      kind: 'formula',
      title: 'Tres tipos de participio',
      text: 'La forma depende de dos preguntas: ¿el sujeto **hace** la acción (-ing) o la **recibe** (-ed)? ¿Ocurre **antes** que la acción principal (having + participio)?',
      rows: [
        {
          label: 'Presente (activo)',
          parts: [
            { text: 'Knowing', caption: '-ing', tone: 'teal' },
            { text: 'the area well,', tone: 'ink' },
            { text: 'she', caption: 'mismo sujeto', tone: 'violet' },
            { text: 'found the hotel easily', caption: 'oración principal', tone: 'ink' },
          ],
        },
        {
          label: 'Pasado (pasivo)',
          parts: [
            { text: 'Built', caption: 'participio', tone: 'coral' },
            { text: 'in 1920,', tone: 'ink' },
            { text: 'the theatre', caption: 'mismo sujeto', tone: 'violet' },
            { text: 'needs urgent repairs', caption: 'oración principal', tone: 'ink' },
          ],
        },
        {
          label: 'Perfecto (acción anterior)',
          parts: [
            { text: 'Having finished', caption: 'having + participio', tone: 'amber' },
            { text: 'the report,', tone: 'ink' },
            { text: 'he', caption: 'mismo sujeto', tone: 'violet' },
            { text: 'went home', caption: 'oración principal', tone: 'ink' },
          ],
        },
      ],
      examples: [
        {
          en: '**Not wanting** to be late, we left at dawn.',
          es: 'Como no queríamos llegar tarde, salimos al amanecer.',
          note: 'La negación va siempre delante: not + participio.',
        },
        {
          en: '**Having been warned** about the traffic, they took the train.',
          es: 'Como les habían advertido del tráfico, tomaron el tren.',
          note: 'Perfecto + pasivo: having been + participio.',
        },
      ],
    },
    {
      kind: 'timeline',
      title: 'Having done: primero esto, luego aquello',
      text: 'Con **-ing**, las dos acciones ocurren casi a la vez. Con **having + participio** dejas claro que una acción **terminó antes** de que empezara la otra.',
      items: [
        { type: 'point', at: -65, label: 'Having checked in…', tone: 'amber' },
        { type: 'point', at: -30, label: '…we went out for dinner', tone: 'coral' },
      ],
      example: {
        en: '**Having checked in**, we went out for dinner.',
        es: 'Después de registrarnos, salimos a cenar.',
        note: '= After we had checked in, we went out for dinner.',
      },
    },
    {
      kind: 'examples',
      title: 'Una forma, varios significados',
      text: 'El participio no dice si la relación es de causa, tiempo, condición o resultado: lo deduces por el **contexto**.',
      items: [
        {
          en: '**Being** new to the team, I asked a lot of questions.',
          es: 'Como era nuevo en el equipo, hice muchas preguntas.',
          note: 'Causa (= Because I was new…).',
        },
        {
          en: '**Walking** through the old town, we came across a tiny bookshop.',
          es: 'Mientras caminábamos por el casco antiguo, encontramos una librería diminuta.',
          note: 'Tiempo (= While we were walking…).',
        },
        {
          en: '**Used** correctly, this tool can save you hours.',
          es: 'Si se usa correctamente, esta herramienta puede ahorrarte horas.',
          note: 'Condición (= If it is used correctly…).',
        },
        {
          en: 'The river burst its banks, **forcing** hundreds of families to leave.',
          es: 'El río se desbordó, lo que obligó a cientos de familias a irse.',
          note: 'Resultado: el participio va al final, tras una coma.',
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Oración completa vs participio',
      text: 'Las dos versiones significan lo mismo. La segunda es más **compacta y formal**.',
      left: {
        label: 'Oración completa',
        tone: 'ink',
        points: [
          'Conjunción + sujeto + verbo conjugado',
          'La relación es explícita (because, after, if)',
          'Natural al hablar',
        ],
        example: {
          en: 'After she had read the contract, she signed it.',
          es: 'Después de leer el contrato, lo firmó.',
        },
      },
      right: {
        label: 'Participle clause',
        tone: 'teal',
        points: [
          'Sin conjunción ni sujeto repetido',
          'La relación se deduce del contexto',
          'Típico de textos escritos y formales',
        ],
        example: {
          en: '**Having read** the contract, she signed it.',
          es: 'Tras leer el contrato, lo firmó.',
        },
      },
    },
    {
      kind: 'examples',
      title: 'Relativas reducidas',
      text: 'También puedes acortar una **relative clause**: quita who / which / that + be. Ojo: **-ing** no sirve para una acción única y terminada: «the man **who stole** my wallet», no «the man stealing».',
      items: [
        {
          en: 'The people **living** next door are very friendly.',
          es: 'Las personas que viven al lado son muy amables.',
          note: '= who live next door (activo).',
        },
        {
          en: 'The documents **sent** by the bank arrived this morning.',
          es: 'Los documentos enviados por el banco llegaron esta mañana.',
          note: '= which were sent by the bank (pasivo).',
        },
        {
          en: 'Passengers **travelling** with children may board first.',
          es: 'Los pasajeros que viajan con niños pueden abordar primero.',
          note: 'Muy común en avisos y reglamentos.',
        },
      ],
    },
    {
      kind: 'trap',
      title: 'Trampa: el participio colgado',
      wrong: 'Walking into the office, my phone started ringing.',
      right: 'Walking into the office, I heard my phone ringing.',
      why: 'El sujeto oculto del participio es **siempre** el sujeto de la oración principal. En la primera versión, ¡el teléfono entra caminando a la oficina! En español «Entrando a la oficina, sonó mi teléfono» se tolera; en inglés es un error conocido como **dangling participle**.',
    },
    {
      kind: 'tips',
      title: 'Registro: ¿cuándo suenan bien?',
      text: 'Son una herramienta sobre todo **escrita**. Al hablar, casi siempre preferimos la oración completa.',
      items: [
        {
          emoji: '✍️',
          title: 'Donde brillan',
          text: 'Informes, ensayos, noticias, narraciones y cartas de presentación: Having worked in sales for six years, I…',
        },
        {
          emoji: '🗣️',
          title: 'Fórmulas que sí se dicen',
          text: 'Generally speaking… · Having said that… · Judging by… · Considering… Son fijas y no necesitan compartir sujeto.',
        },
        {
          emoji: '☕',
          title: 'Donde suenan pomposos',
          text: 'En un chat o una charla. «Being hungry, I ordered a pizza» suena a novela; di «I was hungry, so I ordered a pizza».',
        },
        {
          emoji: '🔍',
          title: 'Revisión final',
          text: 'Antes de enviar un texto, pregúntate: ¿quién hace la acción del participio? Debe ser el sujeto que viene tras la coma.',
        },
      ],
    },
    {
      kind: 'check',
      question: '¿Cuál de estas oraciones es correcta?',
      options: [
        'Having lost my passport, the embassy gave me a temporary one.',
        'Having lost my passport, I had to go to the embassy.',
        'Having lose my passport, I had to go to the embassy.',
      ],
      answer: 1,
      explain: 'Quien perdió el pasaporte soy yo, así que «I» debe ser el sujeto de la oración principal. En la primera opción lo habría perdido la embajada.',
    },
  ],
  exercises: [
    {
      id: 'c1-participle-clauses-1',
      type: 'choice',
      prompt: 'Elige la opción correcta.',
      sentence: '___ tired after the long flight, we went straight to bed.',
      options: ['Felt', 'Feeling', 'Having feel'],
      answer: 1,
      explain: 'Nosotros «sentimos» el cansancio (sentido activo) y ocurre al mismo tiempo que la acción principal → participio presente: Feeling.',
    },
    {
      id: 'c1-participle-clauses-2',
      type: 'choice',
      prompt: 'Elige la opción correcta.',
      sentence: "___ in 1889, the tower is still the city's most famous landmark.",
      options: ['Building', 'Having built', 'Built'],
      answer: 2,
      explain: 'La torre no construye: fue construida. El sentido pasivo pide participio pasado: Built in 1889.',
    },
    {
      id: 'c1-participle-clauses-3',
      type: 'sort',
      prompt: '¿La oración es correcta o tiene un participio «colgado» (dangling)?',
      categories: ['Correcta', 'Participio colgado'],
      items: [
        { text: 'Having missed the bus, I walked to work.', cat: 0 },
        { text: 'Walking into the room, the lights went out.', cat: 1 },
        { text: 'Written in simple language, the guide is easy to follow.', cat: 0 },
        { text: 'Driving to the airport, my phone rang.', cat: 1 },
        { text: 'Not wanting to wake anyone, she closed the door quietly.', cat: 0 },
        { text: 'Having finished dinner, the dishes were washed.', cat: 1 },
      ],
      explain: 'El sujeto de la oración principal debe ser quien realiza el participio. Las luces no caminan, el teléfono no maneja y los platos no terminan de cenar.',
    },
    {
      id: 'c1-participle-clauses-4',
      type: 'gap',
      prompt: 'Completa con un participio perfecto (having + participio).',
      sentence: '___ the email twice, she finally pressed send.',
      hint: '(read)',
      answers: ['Having read'],
      explain: 'Primero leyó el correo dos veces y solo después lo envió. La acción anterior y terminada se expresa con having + participio.',
    },
    {
      id: 'c1-participle-clauses-5',
      type: 'order',
      es: 'Como no sabía qué decir, me quedé callado.',
      words: ['Not', 'knowing', 'what', 'to say,', 'I', 'kept', 'quiet.'],
      distractors: ['known', "didn't"],
      explain: 'La negación va delante del participio (Not knowing) y no lleva auxiliar. «I» es el sujeto de ambas acciones.',
    },
    {
      id: 'c1-participle-clauses-6',
      type: 'error',
      sentence: 'The documents [sending] by the bank arrived this morning.',
      fix: 'sent',
      explain: 'Los documentos no envían: fueron enviados (which were sent). El sentido pasivo, reforzado por «by the bank», pide participio pasado.',
    },
    {
      id: 'c1-participle-clauses-7',
      type: 'listen',
      text: 'Having said that, I think the plan could work.',
      es: 'Dicho esto, creo que el plan podría funcionar.',
      explain: '«Having said that» es una fórmula fija para introducir un contraste con lo que acabas de decir. Se usa mucho al hablar.',
    },
    {
      id: 'c1-participle-clauses-8',
      type: 'gap',
      prompt: 'Completa con una sola palabra (relativa reducida).',
      sentence: 'Anyone ___ to attend the workshop should register by Friday.',
      hint: '(wish)',
      answers: ['wishing'],
      explain: '«Anyone who wishes» se reduce a «Anyone wishing»: sentido activo, por eso -ing. Es típico de avisos formales.',
    },
    {
      id: 'c1-participle-clauses-9',
      type: 'choice',
      prompt: 'Elige la opción correcta.',
      sentence: '___ twice by the committee, the proposal was finally withdrawn.',
      options: ['Having rejected', 'Having been rejected', 'Rejecting', 'Been rejected'],
      answer: 1,
      explain: 'La propuesta recibió el rechazo (pasivo) y eso ocurrió antes de que la retiraran (perfecto) → having been + participio.',
    },
    {
      id: 'c1-participle-clauses-10',
      type: 'error',
      sentence: 'The man [stealing] my wallet last night was caught on camera.',
      fix: 'who stole',
      explain: 'Una relativa reducida con -ing no puede expresar una acción única y ya terminada (last night). Se necesita la relativa completa: who stole.',
    },
    {
      id: 'c1-participle-clauses-11',
      type: 'rewrite',
      prompt: 'Reescribe la oración con un participle clause, empezando con la palabra dada.',
      source: 'Because she had lived in Brazil for years, she spoke fluent Portuguese.',
      start: 'Having',
      answers: ['Having lived in Brazil for years, she spoke fluent Portuguese'],
      explain: 'Se eliminan «because» y el sujeto repetido. Como vivir en Brasil es anterior a la acción principal, «had lived» se convierte en «having lived».',
    },
    {
      id: 'c1-participle-clauses-12',
      type: 'rewrite',
      prompt: 'Reescribe la oración con un participle clause, empezando con la palabra dada.',
      source: "As he hadn't been told about the change, he went to the wrong room.",
      start: 'Not',
      answers: ['Not having been told about the change, he went to the wrong room'],
      explain: 'Es negativo, anterior y pasivo a la vez: not + having been + participio. Lo habitual es que «not» abra la cláusula.',
    },
  ],
}

export default unit
