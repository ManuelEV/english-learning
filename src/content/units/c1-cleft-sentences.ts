import type { Unit } from '../types'

const unit: Unit = {
  id: 'c1-cleft-sentences',
  line: 'c1',
  title: 'Cleft Sentences',
  subtitle: 'Parte la oración en dos para destacar justo lo que importa: quién, qué, cuándo o por qué.',
  emoji: '🔦',
  minutes: 15,
  steps: [
    {
      kind: 'hook',
      emoji: '📧',
      title: 'Un reflector sobre lo importante',
      text: 'Tu jefa cree que tú enviaste el archivo equivocado. «Marco sent it» informa, pero no corrige con fuerza. Un **cleft sentence** parte la oración en dos y pone un reflector sobre la parte clave.',
      example: {
        en: '**It was Marco who** sent the wrong file. **What I did was** forward it.',
        es: 'Fue Marco quien envió el archivo equivocado. Lo que yo hice fue reenviarlo.',
        note: 'Versión B2: Marco sent the wrong file. I forwarded it.',
      },
    },
    {
      kind: 'formula',
      title: 'Dos moldes básicos',
      text: 'El **it-cleft** pone el foco al principio; el **wh-cleft** lo guarda para el final, creando expectativa. Para destacar una acción: What + sujeto + **do** + be + **verbo base**.',
      rows: [
        {
          label: 'It-cleft',
          parts: [
            { text: 'It', caption: 'obligatorio', tone: 'ink' },
            { text: 'was', caption: 'be', tone: 'teal' },
            { text: 'Marco', caption: 'foco', tone: 'coral' },
            { text: 'who / that', caption: 'conector', tone: 'violet' },
            { text: 'sent the file', caption: 'resto', tone: 'ink' },
          ],
        },
        {
          label: 'Wh-cleft',
          parts: [
            { text: 'What', caption: 'lo que', tone: 'violet' },
            { text: 'I need', caption: 'sujeto + verbo', tone: 'ink' },
            { text: 'is', caption: 'be', tone: 'teal' },
            { text: 'a holiday', caption: 'foco', tone: 'coral' },
          ],
        },
        {
          label: 'Wh-cleft con acción',
          parts: [
            { text: 'What', caption: 'lo que', tone: 'violet' },
            { text: 'she did', caption: 'sujeto + do', tone: 'ink' },
            { text: 'was', caption: 'be', tone: 'teal' },
            { text: 'call the client', caption: 'verbo base', tone: 'coral' },
          ],
        },
      ],
      examples: [
        { en: '**It was the price that** put me off.', es: 'Fue el precio lo que me desanimó.' },
        { en: '**What we need is** a clear plan.', es: 'Lo que necesitamos es un plan claro.' },
      ],
    },
    {
      kind: 'examples',
      title: 'It-cleft: elige tu foco',
      text: 'Oración base: «Laura met the investors in Lima on Monday». Puedes destacar casi cualquier parte. Con personas usa **who** o **that**; con todo lo demás, **that**.',
      items: [
        {
          en: '**It was Laura who** met the investors in Lima.',
          es: 'Fue Laura quien se reunió con los inversionistas en Lima.',
          note: 'Foco en la persona (no fue otra).',
        },
        {
          en: '**It was in Lima that** Laura met the investors.',
          es: 'Fue en Lima donde Laura se reunió con los inversionistas.',
          note: 'Foco en el lugar: «that», no «where».',
        },
        {
          en: '**It was on Monday that** Laura met the investors.',
          es: 'Fue el lunes cuando Laura se reunió con los inversionistas.',
          note: 'Foco en el momento: «that», no «when».',
        },
        {
          en: '**It was not until Friday that** they signed the deal.',
          es: 'No fue sino hasta el viernes que firmaron el acuerdo.',
          note: 'It was not until… that… es muy frecuente en textos formales.',
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Neutra vs con foco',
      text: 'La información es la misma. El cleft agrega un mensaje implícito: **«esto, y no otra cosa»**.',
      left: {
        label: 'Oración neutra',
        tone: 'ink',
        points: [
          'Solo informa',
          'Todas las partes pesan igual',
          'Ideal para datos sin contraste',
        ],
        example: { en: 'I need more time.', es: 'Necesito más tiempo.' },
      },
      right: {
        label: 'Cleft sentence',
        tone: 'coral',
        points: [
          'Destaca una parte y relega el resto',
          'Corrige o contrasta: no X, sino Y',
          'Crea expectativa antes del dato clave',
        ],
        example: {
          en: '**What I need is** more time, not more money.',
          es: 'Lo que necesito es más tiempo, no más dinero.',
        },
      },
    },
    {
      kind: 'examples',
      title: 'Más moldes para tu repertorio',
      text: 'Además de **what**, puedes abrir con **all** (= lo único que), **the reason why**, **the person who** o **the thing that**.',
      items: [
        {
          en: '**All I want is** a quiet weekend.',
          es: 'Lo único que quiero es un fin de semana tranquilo.',
          note: 'All = the only thing. Nunca «all what».',
        },
        {
          en: "**The reason why** I'm calling **is that** I need your signature.",
          es: 'La razón por la que llamo es que necesito tu firma.',
          note: 'The reason… is that… (evita «is because» en textos formales).',
        },
        {
          en: '**What happened was that** the taxi never showed up.',
          es: 'Lo que pasó fue que el taxi nunca llegó.',
          note: 'Perfecto para explicar un problema o dar una excusa.',
        },
        {
          en: '**What** surprised me most **was** the silence.',
          es: 'Lo que más me sorprendió fue el silencio.',
        },
        {
          en: '**The person who** really helped me **was** my supervisor.',
          es: 'La persona que realmente me ayudó fue mi supervisora.',
        },
      ],
    },
    {
      kind: 'trap',
      title: 'Trampa 1: «Fue en… donde»',
      wrong: 'Was in Lima where we met.',
      right: 'It was in Lima that we met.',
      why: 'En español decimos «Fue en Lima donde nos conocimos», sin sujeto y con «donde». En inglés el **it** es obligatorio y, cuando el foco lleva preposición (in Lima, on Monday), el conector es **that**.',
    },
    {
      kind: 'trap',
      title: 'Trampa 2: «todo lo que»',
      wrong: 'All what I need is five more minutes.',
      right: 'All I need is five more minutes.',
      why: '«Todo lo que» nos empuja a decir «all what», que no existe en inglés. Usa **all** solo o **all that**. Además, el verbo después va en singular: All I need **is**…',
    },
    {
      kind: 'tips',
      title: 'Registro: ¿cuándo usarlos?',
      text: 'Los clefts son comunes al hablar y al escribir, pero cada molde tiene su terreno.',
      items: [
        {
          emoji: '🗣️',
          title: 'Naturales al hablar',
          text: 'What I mean is… · The thing is… · All I’m saying is… organizan tus ideas y te dan tiempo para pensar.',
        },
        {
          emoji: '✍️',
          title: 'Elegantes al escribir',
          text: 'It was not until 2020 that… · It is this factor that… guían al lector hacia el dato clave.',
        },
        {
          emoji: '🎯',
          title: 'Solo con un motivo',
          text: 'Úsalos para contrastar, corregir o destacar. Sin contraste real, «It is coffee that I want» suena forzado.',
        },
        {
          emoji: '⚖️',
          title: 'Sin abusar',
          text: 'Si todo está destacado, nada lo está. Uno por párrafo suele bastar.',
        },
      ],
    },
    {
      kind: 'check',
      question: 'Quieres corregir a un colega: la app no se lanzó en mayo, sino en junio. ¿Cuál es correcta?',
      options: [
        'It was in June that we launched the app.',
        'Was in June that we launched the app.',
        'It was in June what we launched the app.',
      ],
      answer: 0,
      explain: 'It-cleft completo: It + was + foco (in June) + that + resto. El «it» no se puede omitir y «what» no funciona como conector aquí.',
    },
  ],
  exercises: [
    {
      id: 'c1-cleft-sentences-1',
      type: 'choice',
      prompt: 'Elige la opción correcta.',
      sentence: 'It was my sister ___ recommended this restaurant.',
      options: ['which', 'who', 'what'],
      answer: 1,
      explain: 'El foco es una persona (my sister), así que el conector es «who» (o «that»). «Which» es para cosas y «what» no une las dos partes de un it-cleft.',
    },
    {
      id: 'c1-cleft-sentences-2',
      type: 'choice',
      prompt: 'Elige la opción correcta.',
      sentence: "___ I really need is a good night's sleep.",
      options: ['That', 'Which', 'What'],
      answer: 2,
      explain: '«What» equivale a «lo que» y abre el wh-cleft: What I need is… «That» y «which» no pueden iniciar esta estructura.',
    },
    {
      id: 'c1-cleft-sentences-3',
      type: 'match',
      prompt: 'Une cada inicio con su final.',
      pairs: [
        ['It was in 2019', 'that we opened our first office.'],
        ['What I admire most about her', 'is her patience.'],
        ['All she did', 'was ask a simple question.'],
        ['The reason why he resigned', 'is that he was offered a better job.'],
        ['The person who called', 'was my former boss.'],
      ],
      explain: 'Cada molde tiene su cierre: It was… that…; What… is + sustantivo; All she did was + verbo base; The reason… is that + oración; The person who… was + persona.',
    },
    {
      id: 'c1-cleft-sentences-4',
      type: 'gap',
      prompt: 'Completa con una sola palabra.',
      sentence: 'What happened ___ that the airline lost our luggage.',
      answers: ['was'],
      explain: 'Las dos mitades del wh-cleft se unen con «be». Como se narra un hecho pasado (happened, lost), va en pasado: was.',
    },
    {
      id: 'c1-cleft-sentences-5',
      type: 'order',
      es: 'Lo único que quiero es un poco de paz y tranquilidad.',
      words: ['All', 'I', 'want', 'is', 'a little', 'peace', 'and quiet.'],
      distractors: ['what', 'are'],
      explain: '«Lo único que» = All (sin «what»). El verbo que une las dos partes va en singular: All I want is…',
    },
    {
      id: 'c1-cleft-sentences-6',
      type: 'error',
      sentence: '[All what] I need is five more minutes.',
      fix: 'All',
      explain: '«All what» es un calco de «todo lo que». En inglés se dice «All I need» o «All that I need».',
    },
    {
      id: 'c1-cleft-sentences-7',
      type: 'listen',
      text: 'What I need is a strong cup of coffee.',
      es: 'Lo que necesito es una taza de café bien cargado.',
      explain: 'Wh-cleft: What + sujeto + verbo + is + foco. Lo importante (a strong cup of coffee) queda al final.',
    },
    {
      id: 'c1-cleft-sentences-8',
      type: 'gap',
      prompt: 'Completa con una sola palabra.',
      sentence: 'It was not until midnight ___ the results were finally announced.',
      answers: ['that'],
      explain: 'La estructura fija es «It was not until… that…». Aunque el foco sea un momento, el conector es «that», no «when».',
    },
    {
      id: 'c1-cleft-sentences-9',
      type: 'error',
      sentence: 'It was the manager [which] approved the budget, not me.',
      fix: 'who',
      explain: 'Cuando el foco es una persona, el it-cleft usa «who» (también vale «that»), nunca «which».',
    },
    {
      id: 'c1-cleft-sentences-10',
      type: 'choice',
      prompt: 'Elige la opción correcta para una carta formal.',
      sentence: "The reason why I'm writing ___ I would like to apply for the position.",
      options: ['is that', 'is because of', 'it is that', 'is why'],
      answer: 0,
      explain: '«The reason why… is that + oración». No se repite el sujeto con «it», y «because of» necesita un sustantivo, no una oración.',
    },
    {
      id: 'c1-cleft-sentences-11',
      type: 'rewrite',
      prompt: 'Reescribe la oración empezando con las palabras dadas.',
      source: "I didn't understand the problem until I read the report.",
      start: 'It was not until',
      answers: [
        'It was not until I read the report that I understood the problem',
        'It was not until I had read the report that I understood the problem',
        "It was not until I'd read the report that I understood the problem",
      ],
      explain: 'El «not» pasa a la primera parte (It was not until…), así que después de «that» el verbo queda en afirmativo: I understood.',
    },
    {
      id: 'c1-cleft-sentences-12',
      type: 'rewrite',
      prompt: 'Destaca la acción. Reescribe empezando con las palabras dadas.',
      source: 'She forwarded the email to the whole team.',
      start: 'What she did was',
      answers: [
        'What she did was forward the email to the whole team',
        'What she did was to forward the email to the whole team',
      ],
      explain: 'Para destacar una acción se usa What + sujeto + did + was + verbo en forma base. El pasado ya lo marca «did», así que no se dice «was forwarded».',
    },
  ],
}

export default unit
