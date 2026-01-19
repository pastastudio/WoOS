'use server';

function calcAnalytics() {
  const pointsWindows = getPointsFromDatabase('Windows');
  const pointsLinux = getPointsFromDatabase('Linux');
  const pointsMacos = getPointsFromDatabase('MacOS');

  const totalPoints = pointsWindows + pointsLinux + pointsMacos;
  const safeTotalPoints = totalPoints > 0 ? totalPoints : 1;

  const percentWindows = (pointsWindows / safeTotalPoints) * 100;
  const percentLinux = (pointsLinux / safeTotalPoints) * 100;
  const percentMacos = (pointsMacos / safeTotalPoints) * 100;

  savePercentToDatabase('Windows', percentWindows);
  savePercentToDatabase('Linux', percentLinux);
  savePercentToDatabase('MacOS', percentMacos);
}

function getPointsFromDatabase(os: string): number {
  //datenbank access logic hier?
  if (os === 'Windows') return 25;
  if (os === 'Linux') return 50;
  if (os === 'MacOS') return 25;
  return 0;
}

function savePercentToDatabase(os: string, percent: number) {
  // Datenbank access logic hier?
}

function getPercentFromDatabase(os: string): number {
  //datenbank access logic hier?
  return 25;
}
