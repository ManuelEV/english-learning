import type { Unit } from '../types'

const unit: Unit = {
  id: 'c1-inversion',
  line: 'c1',
  title: 'Inversion for Emphasis',
  subtitle: 'Dale fuerza y elegancia a tus frases invirtiendo el orden, como en discursos e informes.',
  emoji: '🔄',
  minutes: 15,
  steps: [
    {
      kind: 'hook',
      emoji: '🎤',
      title: 'La misma idea, otro impacto',
      text: 'Estás cerrando un discurso. «I have never seen such commitment» es correcto, pero plano. Un hablante C1 adelanta **never** y, como en una pregunta, pone el auxiliar antes del sujeto. Eso es la **inversión**.',
      example: {
        en: '**Never have I seen** such commitment from a team.',
        es: 'Jamás he visto tanto compromiso en un equipo.',
        note: 'Versión B2: I have never seen such commitment from a team.',
      },
    },
    {
      kind: 'formula',
      title: 'Cómo se construye',
      text: 'Expresión negativa o restrictiva al inicio + **orden de pregunta**. Si no hay auxiliar (present o past simple), necesitas **do / does / did** y el verbo vuelve a su forma base.',
      rows: [
        {
          label: 'Con auxiliar',
          parts: [
            { text: 'Never', caption: 'adverbio negativo', tone: 'coral' },
            { text: 'have', caption: 'auxiliar', tone: 'teal' },
            { text: 'I', caption: 'sujeto', tone: 'ink' },
            { text: 'seen', caption: 'verbo principal', tone: 'violet' },
            { text: 'such a mess', tone: 'ink' },
          ],
        },
        {
          label: 'Sin auxiliar → do / does / did',
          parts: [
            { text: 'Rarely', caption: 'adverbio restrictivo', tone: 'coral' },
            { text: 'does', caption: 'do / does / did', tone: 'teal' },
            { text: 'she', caption: 'sujeto', tone: 'ink' },
            { text: 'complain', caption: 'forma base', tone: 'violet' },
          ],
        },
        {
          label: 'Con modal',
          parts: [
            { text: 'Under no circumstances', caption: 'expresión negativa', tone: 'coral' },
            { text: 'should', caption: 'modal', tone: 'teal' },
            { text: 'you', caption: 'sujeto', tone: 'ink' },
            { text: 'sign', caption: 'forma base', tone: 'violet' },
            { text: 'it', tone: 'ink' },
          ],
        },
      ],
      examples: [
        { en: '**Rarely does the board agree** so quickly.', es: 'Rara vez la junta directiva se pone de acuerdo tan rápido.' },
        {
          en: '**Under no circumstances should passengers leave** their luggage unattended.',
          es: 'Bajo ninguna circunstancia los pasajeros deben dejar su equipaje desatendido.',
        },
      ],
    },
    {
      kind: 'examples',
      title: 'Los disparadores más útiles',
      text: 'Todas estas expresiones tienen un sentido **negativo o limitador**. Solo provocan inversión cuando van **al inicio** de la oración.',
      items: [
        {
          en: '**Seldom have we received** so many applications.',
          es: 'Pocas veces hemos recibido tantas postulaciones.',
          note: 'Never, rarely, seldom: frecuencia casi nula.',
        },
        {
          en: '**Not only did she win** the contract, **but she also** negotiated better terms.',
          es: 'No solo ganó el contrato, sino que además negoció mejores condiciones.',
          note: 'Solo se invierte la primera parte; después de «but» el orden es normal.',
        },
        {
          en: '**Little did we know** that the flight had already been cancelled.',
          es: 'No teníamos ni idea de que el vuelo ya había sido cancelado.',
          note: 'Little did I know = no me imaginaba. Muy usado al contar historias.',
        },
        {
          en: '**Only then did I realise** how serious the situation was.',
          es: 'Solo entonces me di cuenta de lo grave que era la situación.',
          note: 'Only then / only later / not until… también invierten.',
        },
      ],
    },
    {
      kind: 'timeline',
      title: 'Hardly… when · No sooner… than',
      text: 'Dos acciones pasadas, una **inmediatamente** después de la otra. La primera va en **past perfect con inversión**; la segunda, en past simple y sin inversión. Ojo con las parejas: hardly… **when**, no sooner… **than**.',
      items: [
        { type: 'point', at: -60, label: 'had we sat down', tone: 'teal' },
        { type: 'point', at: -40, label: 'the alarm went off', tone: 'coral' },
      ],
      example: {
        en: '**Hardly had we sat down when** the fire alarm went off.',
        es: 'Apenas nos habíamos sentado cuando sonó la alarma de incendios.',
        note: 'Igual: No sooner had we sat down than the fire alarm went off.',
      },
    },
    {
      kind: 'compare',
      title: 'Neutro vs enfático',
      text: 'El significado es el mismo; cambia el **peso** que le das a la idea negativa.',
      left: {
        label: 'Orden normal',
        tone: 'ink',
        points: [
          'El adverbio va en su lugar habitual',
          'Tono neutro, de conversación',
          'Sirve en cualquier contexto',
        ],
        example: {
          en: 'You should not open this door under any circumstances.',
          es: 'No debes abrir esta puerta bajo ninguna circunstancia.',
        },
      },
      right: {
        label: 'Con inversión',
        tone: 'coral',
        points: [
          'La expresión negativa pasa al inicio',
          'Auxiliar antes del sujeto',
          'Tono formal, dramático o de advertencia',
        ],
        example: {
          en: '**Under no circumstances should you open** this door.',
          es: 'Bajo ninguna circunstancia debes abrir esta puerta.',
        },
      },
    },
    {
      kind: 'formula',
      title: 'Condicionales invertidos',
      text: 'En registro formal puedes **quitar «if»** y adelantar **had**, **were** o **should**. Para negar, «not» va después del sujeto: Had I **not** seen it… (nunca «Hadn’t I seen it»).',
      rows: [
        {
          label: 'Pasado irreal (= If I had known)',
          parts: [
            { text: 'Had', caption: 'sin «if»', tone: 'teal' },
            { text: 'I', caption: 'sujeto', tone: 'ink' },
            { text: 'known,', caption: 'participio', tone: 'violet' },
            { text: 'I would have called', tone: 'ink' },
          ],
        },
        {
          label: 'Hipótesis (= If I were to accept)',
          parts: [
            { text: 'Were', caption: 'sin «if»', tone: 'teal' },
            { text: 'I', caption: 'sujeto', tone: 'ink' },
            { text: 'to accept,', caption: 'to + base', tone: 'violet' },
            { text: 'I would have to move', tone: 'ink' },
          ],
        },
        {
          label: 'Posibilidad (= If you need)',
          parts: [
            { text: 'Should', caption: 'sin «if»', tone: 'teal' },
            { text: 'you', caption: 'sujeto', tone: 'ink' },
            { text: 'need help,', caption: 'forma base', tone: 'violet' },
            { text: 'please call us', tone: 'ink' },
          ],
        },
      ],
      examples: [
        {
          en: '**Had I known** about the delay, I would have left later.',
          es: 'De haber sabido del retraso, habría salido más tarde.',
        },
        {
          en: '**Should you require** any further details, please contact reception.',
          es: 'Si necesitara más información, por favor comuníquese con recepción.',
          note: 'Clásico de correos formales y avisos.',
        },
      ],
    },
    {
      kind: 'trap',
      title: 'Trampa: adelantar sin invertir',
      wrong: 'Not only he arrived late, but he also forgot the documents.',
      right: 'Not only did he arrive late, but he also forgot the documents.',
      why: 'En español «No solo llegó tarde…» mantiene el verbo tal cual, así que tendemos a adelantar la expresión sin tocar nada más. En inglés necesitas el auxiliar antes del sujeto y, con **did**, el verbo en forma base: did he **arrive**, no «did he arrived».',
    },
    {
      kind: 'tips',
      title: 'Registro: ¿elegante o exagerado?',
      text: 'La inversión es un condimento fuerte: una pizca luce, demasiada empalaga.',
      items: [
        {
          emoji: '✍️',
          title: 'Donde suena natural',
          text: 'Discursos, informes, ensayos, avisos oficiales y correos formales: Should you have any questions…',
        },
        {
          emoji: '📖',
          title: 'Al contar historias',
          text: 'Little did I know… y No sooner had I… than… dan suspenso, incluso al hablar.',
        },
        {
          emoji: '☕',
          title: 'Donde suena pomposo',
          text: 'En una charla casual. «Never have I eaten such tacos» suena teatral; di «I’ve never had tacos this good».',
        },
        {
          emoji: '⚖️',
          title: 'Dosis',
          text: 'Una inversión por párrafo es suficiente para que conserve su efecto.',
        },
      ],
    },
    {
      kind: 'check',
      question: '¿Cuál de estas oraciones es correcta?',
      options: [
        'Seldom we receive complaints like this.',
        'Seldom do we receive complaints like this.',
        'Seldom we do receive complaints like this.',
      ],
      answer: 1,
      explain: '«Seldom» al inicio exige orden de pregunta: auxiliar (do) + sujeto (we) + verbo base (receive).',
    },
  ],
  exercises: [
    {
      id: 'c1-inversion-1',
      type: 'choice',
      prompt: 'Elige la opción correcta.',
      sentence: 'Never ___ such a beautiful sunset.',
      options: ['I have seen', 'have I seen', 'I saw'],
      answer: 1,
      explain: 'Con «never» al inicio, el auxiliar va antes del sujeto, como en una pregunta: Never have I seen…',
    },
    {
      id: 'c1-inversion-2',
      type: 'sort',
      prompt: 'Si la expresión va al inicio de la oración, ¿exige inversión?',
      categories: ['Exige inversión', 'Orden normal'],
      items: [
        { text: 'Never…', cat: 0 },
        { text: 'Yesterday…', cat: 1 },
        { text: 'Seldom…', cat: 0 },
        { text: 'Fortunately…', cat: 1 },
        { text: 'Under no circumstances…', cat: 0 },
        { text: 'Sometimes…', cat: 1 },
        { text: 'Not only…', cat: 0 },
        { text: 'In my opinion…', cat: 1 },
      ],
      explain: 'Solo las expresiones de sentido negativo o restrictivo (never, seldom, not only, under no circumstances) provocan inversión. Los adverbios de tiempo u opinión no cambian el orden.',
    },
    {
      id: 'c1-inversion-3',
      type: 'gap',
      prompt: 'Completa con la forma correcta (auxiliar + sujeto + verbo).',
      sentence: 'Not only ___ the deadline, but he also forgot to tell the client.',
      hint: '(he / miss)',
      answers: ['did he miss', 'had he missed'],
      explain: 'El past simple no tiene auxiliar propio, así que la inversión necesita «did» y el verbo en forma base: did he miss.',
    },
    {
      id: 'c1-inversion-4',
      type: 'choice',
      prompt: 'Elige la palabra que completa la estructura.',
      sentence: 'No sooner had we sat down ___ the fire alarm went off.',
      options: ['when', 'than', 'that'],
      answer: 1,
      explain: '«Sooner» es un comparativo, por eso va con «than». «When» es la pareja de hardly / scarcely.',
    },
    {
      id: 'c1-inversion-5',
      type: 'order',
      es: 'Bajo ninguna circunstancia debes compartir tu contraseña.',
      words: ['Under', 'no circumstances', 'should', 'you', 'share', 'your', 'password.'],
      distractors: ['not', 'shares'],
      explain: 'Tras «under no circumstances» va modal + sujeto + verbo base. La expresión ya es negativa, así que no se agrega «not».',
    },
    {
      id: 'c1-inversion-6',
      type: 'error',
      sentence: 'Hardly [we had] started the meeting when the power went out.',
      fix: 'had we',
      explain: '«Hardly» al inicio obliga a invertir: had + sujeto. La segunda parte (when the power went out) mantiene el orden normal.',
    },
    {
      id: 'c1-inversion-7',
      type: 'listen',
      text: 'Little did she know that her life would change.',
      es: 'No se imaginaba que su vida iba a cambiar.',
      explain: '«Little did she know» significa «no tenía idea»; como «little» tiene sentido negativo, lleva did + sujeto + verbo base.',
    },
    {
      id: 'c1-inversion-8',
      type: 'choice',
      prompt: 'Elige la opción correcta para este correo formal.',
      sentence: '___ you need any further information, please do not hesitate to contact us.',
      options: ['Would', 'Had', 'Should', 'Were'],
      answer: 2,
      explain: '«Should you need» equivale a «If you need» en registro formal. «Had» pediría un participio (needed) y «were» pediría «to need».',
    },
    {
      id: 'c1-inversion-9',
      type: 'gap',
      prompt: 'Completa con una sola palabra (condicional sin «if»).',
      sentence: '___ I known about the strike, I would have taken an earlier flight.',
      answers: ['Had'],
      explain: 'Es un tercer condicional invertido: Had I known = If I had known. El participio «known» y «would have taken» lo delatan.',
    },
    {
      id: 'c1-inversion-10',
      type: 'error',
      sentence: 'Not only [the hotel was] overpriced, but it was also miles from the beach.',
      fix: 'was the hotel',
      explain: 'Después de «not only» al inicio, el verbo «be» pasa antes del sujeto: was the hotel. La parte con «but… also» no se invierte.',
    },
    {
      id: 'c1-inversion-11',
      type: 'rewrite',
      prompt: 'Reescribe la oración sin «if», empezando con la palabra dada.',
      source: 'If I had known you were coming, I would have booked a bigger table.',
      start: 'Had',
      answers: [
        'Had I known you were coming, I would have booked a bigger table',
        "Had I known you were coming, I'd have booked a bigger table",
        'Had I known that you were coming, I would have booked a bigger table',
        "Had I known that you were coming, I'd have booked a bigger table",
      ],
      explain: 'En el tercer condicional formal se elimina «if» y «had» pasa antes del sujeto. La otra mitad de la oración no cambia.',
    },
    {
      id: 'c1-inversion-12',
      type: 'rewrite',
      prompt: 'Reescribe la oración empezando con las palabras dadas.',
      source: 'As soon as the plane took off, the baby started crying.',
      start: 'No sooner',
      answers: [
        'No sooner had the plane taken off than the baby started crying',
        'No sooner had the plane taken off than the baby started to cry',
        'No sooner did the plane take off than the baby started crying',
        'No sooner did the plane take off than the baby started to cry',
      ],
      explain: 'La primera acción va en past perfect con inversión (had the plane taken off) y se une a la segunda con «than», no con «when».',
    },
  ],
}

export default unit
