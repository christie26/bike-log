// Language of the page text, the dates and the place names (passed to Nominatim as accept-language).
export const LOCALES = { ko: 'ko-KR', es: 'es-MX', fr: 'fr-FR', en: 'en-GB', ja: 'ja-JP' };
export const TEXT = {
  en: {
    lang: 'Language', total: 'Total', noRide: 'No ride yet', dayN: (n) => `Day ${n}`, overnight: 'overnight', milestone: 'milestone', start: 'start', end: 'end',
    ride: (day) => `${day} ride`, speed: 'speed', elevation: 'elevation', noAddress: 'address unavailable', unknownPlace: 'unknown place',
    next: 'Next', toGo: (km) => `${km} to go`, reached: 'reached', allReached: 'All milestones reached', straight: 'straight',
    lastUpload: 'Last upload',
    guestbook: 'Messages', yourName: 'Your name', yourMessage: 'Leave a message for Etienne', send: 'Send', noMessage: 'No message yet', sendFailed: 'Could not send. Try again.',
  },
  ko: {
    lang: '언어', total: '합계', noRide: '아직 라이딩이 없어요', dayN: (n) => `${n}일차`, overnight: '숙박', milestone: '마일스톤', start: '출발', end: '도착',
    ride: (day) => `${day} 라이딩`, speed: '속도', elevation: '고도', noAddress: '주소를 불러오지 못함', unknownPlace: '알 수 없는 장소',
    next: '다음', toGo: (km) => `${km} 남음`, reached: '도착', allReached: '모든 마일스톤 도착', straight: '직선',
    lastUpload: '마지막 업로드',
    guestbook: '메시지', yourName: '이름', yourMessage: '에티엔에게 응원 메세지를 남겨보세요', send: '보내기', noMessage: '아직 메시지가 없어요', sendFailed: '보내지 못했어요. 다시 시도해 주세요.',
  },
  es: {
    lang: 'Idioma', total: 'Total', noRide: 'Aún no hay recorridos', dayN: (n) => `Día ${n}`, overnight: 'noche', milestone: 'hito', start: 'salida', end: 'llegada',
    ride: (day) => `Recorrido del ${day}`, speed: 'velocidad', elevation: 'altitud', noAddress: 'dirección no disponible', unknownPlace: 'lugar desconocido',
    next: 'Siguiente', toGo: (km) => `faltan ${km}`, reached: 'alcanzado', allReached: 'Todos los hitos alcanzados', straight: 'en línea recta',
    lastUpload: 'Última subida',
    guestbook: 'Mensajes', yourName: 'Tu nombre', yourMessage: 'Deja un mensaje para Etienne', send: 'Enviar', noMessage: 'Aún no hay mensajes', sendFailed: 'No se pudo enviar. Inténtalo de nuevo.',
  },
  fr: {
    lang: 'Langue', total: 'Total', noRide: 'Pas encore de sortie', dayN: (n) => `Jour ${n}`, overnight: 'nuit', milestone: 'étape', start: 'départ', end: 'arrivée',
    ride: (day) => `Sortie du ${day}`, speed: 'vitesse', elevation: 'altitude', noAddress: 'adresse indisponible', unknownPlace: 'lieu inconnu',
    next: 'Prochaine étape', toGo: (km) => `encore ${km}`, reached: 'atteinte', allReached: 'Toutes les étapes atteintes', straight: 'à vol d’oiseau',
    lastUpload: 'Dernier envoi',
    guestbook: 'Messages', yourName: 'Ton prenom', yourMessage: 'Laisse un message à Etienne', send: 'Envoyer', noMessage: 'Pas encore de message', sendFailed: 'Envoi impossible. Réessaie.',
  },
  ja: {
    lang: '言語', total: '合計', noRide: 'まだ走行はありません', dayN: (n) => `${n}日目`, overnight: '宿泊', milestone: 'マイルストーン', start: '出発', end: '到着',
    ride: (day) => `${day}の走行`, speed: '速度', elevation: '標高', noAddress: '住所を取得できません', unknownPlace: '不明な場所',
    next: '次', toGo: (km) => `残り${km}`, reached: '到着済み', allReached: 'すべてのマイルストーンに到着', straight: '直線',
    lastUpload: '最終アップロード',
    guestbook: 'メッセージ', yourName: 'お名前', yourMessage: 'エティエンヌにメッセージを残してください', send: '送信', noMessage: 'まだメッセージはありません', sendFailed: '送信できませんでした。もう一度お試しください。',
  },
};
