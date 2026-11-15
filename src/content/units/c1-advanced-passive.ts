import type { Unit } from '../types'

const unit: Unit = {
  id: 'c1-advanced-passive',
  line: 'c1',
  title: 'Advanced Passives',
  subtitle: 'Reporta rumores como la prensa, habla de servicios que encargas y domina la pasiva formal.',
  emoji: '📰',
  minutes: 15,
  steps: [
    {
      kind: 'hook',
      emoji: '🗞️',
      title: 'Así hablan las noticias',
      text: 'Un periodista no puede afirmar algo que no ha confirmado. En vez de «People say the minister is hiding abroad», usa una **pasiva de reporte**: suena objetiva y nadie queda señalado como fuente.',
      example: {
        en: 'The minister **is said to be hiding** abroad.',
        es: 'Se dice que el ministro está escondido en el extranjero.',
        note: 'Versión B2: People say (that) the minister is hiding abroad.',
      },
    },
    {
      kind: 'formula',
      title: 'Dos moldes para reportar',
      text: 'Funcionan con verbos de opinión: **say, believe, think, report, know, expect, consider, allege**. Puedes empezar con **It** o con la persona o cosa de la que se habla.',
      rows: [
        {
          label: 'It + pasiva + that',
          parts: [
            { text: 'It', caption: 'sujeto vacío', tone: 'ink' },
            { text: 'is said', caption: 'be + participio', tone: 'teal' },
            { text: 'that', tone: 'violet' },
            { text: 'he lives abroad', caption: 'oración completa', tone: 'ink' },
          ],
        },
        {
          label: 'Sujeto + pasiva + to',
          parts: [
            { text: 'He', caption: 'sujeto real', tone: 'ink' },
            { text: 'is said', caption: 'be + participio', tone: 'teal' },
            { text: 'to live', caption: 'to + infinitivo', tone: 'coral' },
            { text: 'abroad', tone: 'ink' },
          ],
        },
        {
          label: 'Algo anterior',
          parts: [
            { text: 'He', caption: 'sujeto real', tone: 'ink' },
            { text: 'is said', caption: 'be + participio', tone: 'teal' },
            { text: 'to have lived', caption: 'to have + participio', tone: 'amber' },
            { text: 'abroad', tone: 'ink' },
          ],
        },
      ],
      examples: [
        {
          en: '**It is believed that** the company is losing money.',
          es: 'Se cree que la empresa está perdiendo dinero.',
        },
        {
          en: 'The company **is believed to be losing** money.',
          es: 'Se cree que la empresa está perdiendo dinero.',
          note: 'Acción en progreso: to be + -ing.',
        },
      ],
    },
    {
      kind: 'timeline',
      title: '¿To be o to have been?',
      text: 'El infinitivo indica **cuándo** ocurre lo que se comenta. **to live / to be** = al mismo tiempo que «is said». **to have left / to have been** = antes.',
      items: [
        { type: 'point', at: -60, label: 'to have left = antes', tone: 'amber' },
        { type: 'point', at: 0, label: 'is said · to live = ahora', tone: 'teal' },
      ],
      example: {
        en: 'The suspect **is thought to have left** the country last week.',
        es: 'Se cree que el sospechoso salió del país la semana pasada.',
        note: 'Se piensa ahora (is thought); salió antes (to have left).',
      },
    },
    {
      kind: 'compare',
      title: 'It is said that… vs He is said to…',
      text: 'Significan lo mismo. La diferencia está en **qué pones primero** y, por lo tanto, de qué trata la oración.',
      left: {
        label: 'It is said that…',
        tone: 'violet',
        points: [
          'Empieza con «It» impersonal',
          'Sigue una oración completa con su sujeto y verbo',
          'Más fácil de construir; algo más distante',
        ],
        example: {
          en: '**It is reported that** two people were injured.',
          es: 'Se informa que dos personas resultaron heridas.',
        },
      },
      right: {
        label: 'Sujeto + is said to…',
        tone: 'coral',
        points: [
          'Empieza con la persona o cosa',
          'Sigue un infinitivo (nunca «that»)',
          'Más compacta; favorita de los titulares',
        ],
        example: {
          en: 'Two people **are reported to have been** injured.',
          es: 'Se informa que dos personas resultaron heridas.',
        },
      },
    },
    {
      kind: 'examples',
      title: 'Have / get something done',
      text: 'Cuando **otra persona** hace algo por ti (normalmente un servicio), usa **have + objeto + participio**. Con **get** es igual, pero más informal.',
      items: [
        {
          en: 'I **had my laptop repaired** last week.',
          es: 'Mandé a reparar mi laptop la semana pasada.',
          note: 'Yo no la reparé: lo hizo un técnico.',
        },
        {
          en: "We're **having the office painted** next month.",
          es: 'Nos van a pintar la oficina el próximo mes.',
        },
        {
          en: 'You should **get your eyes tested**.',
          es: 'Deberías hacerte revisar la vista.',
          note: 'Get = versión coloquial.',
        },
        {
          en: 'She **had her passport stolen** in Rome.',
          es: 'Le robaron el pasaporte en Roma.',
          note: 'También sirve para algo malo que te pasa, sin que lo hayas pedido.',
        },
      ],
    },
    {
      kind: 'examples',
      title: 'Dos objetos · being done · to be done',
      text: 'Con verbos como **give, offer, send, tell, show, pay**, lo natural es que la **persona** sea el sujeto. Y la pasiva también tiene gerundio (**being done**) e infinitivo (**to be done**).',
      items: [
        {
          en: '**I was offered** the job yesterday.',
          es: 'Me ofrecieron el puesto ayer.',
          note: 'Más natural que «The job was offered to me».',
        },
        {
          en: '**We were told** to wait outside.',
          es: 'Nos dijeron que esperáramos afuera.',
        },
        {
          en: 'I hate **being interrupted** when I speak.',
          es: 'Odio que me interrumpan cuando hablo.',
          note: 'Después de preposiciones y verbos como hate, enjoy, avoid → being + participio.',
        },
        {
          en: 'The report needs **to be finished** by noon.',
          es: 'El informe tiene que estar terminado antes del mediodía.',
          note: 'Después de want, need, expect, hope → to be + participio.',
        },
      ],
    },
    {
      kind: 'trap',
      title: 'Trampa: «me corté el pelo»',
      wrong: 'I cut my hair yesterday.',
      right: 'I had my hair cut yesterday.',
      why: 'En español «me corté el pelo» o «pinté la casa» no aclaran quién lo hizo. En inglés, «I cut my hair» significa que tú mismo tomaste las tijeras. Si pagaste por el servicio, necesitas **have / get + objeto + participio**.',
    },
    {
      kind: 'tips',
      title: 'Registro: ¿formal o natural?',
      text: 'No todas las pasivas avanzadas son formales. Elige según el contexto.',
      items: [
        {
          emoji: '📰',
          title: 'Solo en contextos formales',
          text: 'It is said that… y He is believed to… viven en noticias, informes y textos académicos. Con amigos di «Apparently…» o «They say…».',
        },
        {
          emoji: '💇',
          title: 'De todos los días',
          text: 'Have / get something done es totalmente cotidiano: I need to get my phone fixed.',
        },
        {
          emoji: '🙋',
          title: 'Persona primero',
          text: 'I was given, we were told, she was sent… suenan naturales en cualquier registro.',
        },
        {
          emoji: '⚠️',
          title: 'No mezcles moldes',
          text: 'Después de «He is said» va infinitivo, nunca «that». «He is said that he is rich» es incorrecto → He is said to be rich.',
        },
      ],
    },
    {
      kind: 'check',
      question: 'Un titular habla de un robo que ocurrió anoche. ¿Qué forma necesita?',
      sentence: 'The thieves are believed ___ through the roof.',
      options: ['to escape', 'to have escaped', 'that they escaped'],
      answer: 1,
      explain: 'El escape ocurrió antes del momento en que se cree (are believed) → infinitivo perfecto: to have escaped. Tras «are believed» no puede ir «that».',
    },
  ],
  exercises: [
    {
      id: 'c1-advanced-passive-1',
      type: 'choice',
      prompt: 'Elige la opción correcta.',
      sentence: 'The company is believed ___ over 2,000 people.',
      options: ['to employ', 'that employs', 'employing'],
      answer: 0,
      explain: 'Cuando el sujeto es la persona o cosa de la que se habla (The company), después de la pasiva va to + infinitivo.',
    },
    {
      id: 'c1-advanced-passive-2',
      type: 'choice',
      prompt: 'Unos pintores hicieron el trabajo. Elige la opción correcta.',
      sentence: 'We ___ last month, and the painters finished in just three days.',
      options: ['had the house paint', 'had the house painted', 'were painted the house'],
      answer: 1,
      explain: 'Otra persona hizo el trabajo por nosotros → have + objeto + participio: had the house painted.',
    },
    {
      id: 'c1-advanced-passive-3',
      type: 'match',
      prompt: 'Une cada inicio con su final.',
      pairs: [
        ['It is thought', 'that the fire started in the kitchen.'],
        ['The suspects are thought', 'to have fled the country.'],
        ['I had my laptop', 'repaired at the shop downtown.'],
        ['She hates being', 'told what to do.'],
        ['The form needs to', 'be signed by both parties.'],
      ],
      explain: '«It is thought» va con that + oración; con un sujeto real va el infinitivo. Have + objeto + participio para servicios; being + participio tras «hate»; to be + participio tras «need».',
    },
    {
      id: 'c1-advanced-passive-4',
      type: 'gap',
      prompt: 'Completa con una sola palabra.',
      sentence: 'The bridge is currently ___ repaired by the city council.',
      answers: ['being', 'getting'],
      explain: 'Es una acción en progreso (currently) en voz pasiva: is being + participio. En registro informal también se oye «is getting repaired».',
    },
    {
      id: 'c1-advanced-passive-5',
      type: 'order',
      es: 'Me ofrecieron el puesto la semana pasada.',
      words: ['I', 'was', 'offered', 'the', 'job', 'last week.'],
      distractors: ['did', 'offering'],
      explain: 'Con verbos de dos objetos como «offer», la persona pasa a ser el sujeto de la pasiva: I was offered the job.',
    },
    {
      id: 'c1-advanced-passive-6',
      type: 'error',
      sentence: 'I [cut my hair] at that new salon on Main Street yesterday.',
      fix: 'had my hair cut',
      explain: 'En un salón, el corte lo hace otra persona. «I cut my hair» significaría que te lo cortaste tú; lo correcto es had (o got) my hair cut.',
    },
    {
      id: 'c1-advanced-passive-7',
      type: 'listen',
      text: 'She is said to be the best surgeon in the country.',
      es: 'Se dice que es la mejor cirujana del país.',
      explain: 'Sujeto + is said + to be: una opinión general sobre algo que es cierto ahora, por eso el infinitivo simple.',
    },
    {
      id: 'c1-advanced-passive-8',
      type: 'gap',
      prompt: 'Completa con la forma correcta del infinitivo. La acción ya ocurrió.',
      sentence: 'The thieves are thought ___ the building through a back window last night.',
      hint: '(enter)',
      answers: ['to have entered'],
      explain: 'Se piensa ahora (are thought) algo que pasó anoche. Lo anterior se expresa con el infinitivo perfecto: to have + participio.',
    },
    {
      id: 'c1-advanced-passive-9',
      type: 'choice',
      prompt: 'Elige la opción correcta.',
      sentence: 'Nobody enjoys ___ in front of their colleagues.',
      options: ['to be criticised', 'being criticised', 'be criticised', 'been criticised'],
      answer: 1,
      explain: '«Enjoy» va seguido de -ing. Como la persona recibe la crítica, se necesita el gerundio pasivo: being + participio.',
    },
    {
      id: 'c1-advanced-passive-10',
      type: 'error',
      sentence: 'The painting is believed [that it was] stolen in the 1990s.',
      fix: 'to have been',
      explain: 'Con un sujeto real (The painting) no puede seguir «that». Va el infinitivo, aquí perfecto y pasivo, porque el robo es anterior: to have been stolen.',
    },
    {
      id: 'c1-advanced-passive-11',
      type: 'rewrite',
      prompt: 'Reescribe la oración: un mecánico lo hará por ti. Empieza con las palabras dadas.',
      source: 'A mechanic is going to check my brakes tomorrow.',
      start: 'I am going to',
      answers: [
        'I am going to have my brakes checked tomorrow',
        'I am going to get my brakes checked tomorrow',
        'I am going to have my brakes checked by a mechanic tomorrow',
        'I am going to get my brakes checked by a mechanic tomorrow',
        'I am going to have my brakes checked tomorrow by a mechanic',
        'I am going to get my brakes checked tomorrow by a mechanic',
      ],
      explain: 'Tú organizas el servicio y otra persona lo realiza → have (o get) + objeto + participio: have my brakes checked.',
    },
    {
      id: 'c1-advanced-passive-12',
      type: 'rewrite',
      prompt: 'Reescribe la oración empezando con las palabras dadas.',
      source: 'Scientists believe that the virus originated in bats.',
      start: 'The virus is',
      answers: [
        'The virus is believed to have originated in bats',
        'The virus is believed by scientists to have originated in bats',
      ],
      explain: 'Se cree ahora (is believed) algo que ocurrió antes (originated), así que el pasado se convierte en infinitivo perfecto: to have originated.',
    },
  ],
}

export default unit
