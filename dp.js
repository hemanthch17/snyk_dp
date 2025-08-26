context.message.body.readAsJSON(function(error, response) {
    if (error) {
        context.reject('CustomError', 'Request not in JSON');
    } else {
        const obsData = response.body?.lrsOutput?.dataSets?.[1]?.obs;

        if (obsData && obsData.length > 0) {
            const remitData = obsData[0].TOTALREMITVALUE?.[0];

            if (remitData) {
                if (typeof remitData.TOTAL_REMITANCE !== 'undefined') {
                    remitData.TOTAL_REMITANCE = parseFloat(Number(remitData.TOTAL_REMITANCE).toFixed(2));
                }

                if (typeof remitData.TOTAL_REMITANCE_IN_INR !== 'undefined') {
                    remitData.TOTAL_REMITANCE_IN_INR = parseFloat(Number(remitData.TOTAL_REMITANCE_IN_INR).toFixed(2));
                }
            }
        }

        session.output.write(JSON.stringify(response, null, 2));
    }
});