const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://incual.mecd.es/busqueda-de-cualificaciones');
    await page.screenshot({ path: 'busqeueda-cualificaciones.jpg' });
    await page.click('#cookiesClose');
    await page.screenshot({ path: 'notification-cookie-close.jpg' });
    await page.select('#_publicador_WAR_publicadorportlet_INSTANCE_gTbbrijWuoLz_valor-IDFAMILIA', '1880740');
    await page.screenshot({ path: 'familia-profesional-select-agraria.jpg' });
    
    const familias = await page.evaluate(() => {
        const options = document.querySelectorAll('#_publicador_WAR_publicadorportlet_INSTANCE_gTbbrijWuoLz_valor-IDFAMILIA option'); 
        const result = [];
        options.forEach(option => {  
            result.push({ code: option.value, name: option.text });                     
        })
        return result;   
    })
    for (let familia in familias) {
        await page.select('#_publicador_WAR_publicadorportlet_INSTANCE_gTbbrijWuoLz_valor-IDFAMILIA', familias[familia].code);
        await page.waitFor(1000);           
    }    
    await browser.close();
})();