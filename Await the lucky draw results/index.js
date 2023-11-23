function LuckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

async function GetResults() {
  try {
    const resultTina = await LuckyDraw("Tina");
    console.log(resultTina);
  } catch (error) {
    console.error(error.message);
  }

  try {
    const resultJorge = await LuckyDraw("Jorge");
    console.log(resultJorge);
  } catch (error) {
    console.error(error.message);
  }

  try {
    const resultJulien = await LuckyDraw("Julien");
    console.log(resultJulien);
  } catch (error) {
    console.error(error.message);
  }
}

GetResults();
