async function reason (data, query) {

	console.log('data',data)
	const body = `query=${encodeURIComponent(query)}` +
		data.map(x => `&data=${encodeURIComponent(x)}`).join('')

	console.log(body)
	const result = await fetch('https://eye.restdesc.org/', {
		'credentials': 'omit',
		'headers': {
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:107.0) Gecko/20100101 Firefox/107.0',
			'Accept': 'text/plain, */*; q=0.01',
			'Accept-Language': 'en-US,en;q=0.8,es-CL;q=0.5,fr-BE;q=0.3',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Sec-Fetch-Dest': 'empty',
			'Sec-Fetch-Mode': 'cors',
			'Sec-Fetch-Site': 'same-site',
		},
		'referrer': 'https://n3.restdesc.org/',
		'body': body,
		'method': 'POST',
		'mode': 'cors',
	})

	return result.text()

}

export { reason }
