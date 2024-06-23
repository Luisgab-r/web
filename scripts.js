document.getElementById('series-resistances').addEventListener('change', function() {
    const numResistances = this.value;
    const container = document.getElementById('series-resistance-values');
    container.innerHTML = '';
    for (let i = 0; i < numResistances; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `Resistencia ${i + 1} (Ω)`;
        input.required = true;
        container.appendChild(input);
    }
});

document.getElementById('parallel-resistances').addEventListener('change', function() {
    const numResistances = this.value;
    const container = document.getElementById('parallel-resistance-values');
    container.innerHTML = '';
    for (let i = 0; i < numResistances; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `Resistencia ${i + 1} (Ω)`;
        input.required = true;
        container.appendChild(input);
    }
});

document.getElementById('mixed-resistances').addEventListener('change', function() {
    const numResistances = this.value;
    const container = document.getElementById('mixed-resistance-values');
    container.innerHTML = '';
    for (let i = 0; i < numResistances; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `Resistencia ${i + 1} (Ω)`;
        input.required = true;
        container.appendChild(input);
    }
});

function calculateSeries() {
    const voltage = parseFloat(document.getElementById('series-voltage').value);
    const resistances = Array.from(document.getElementById('series-resistance-values').children).map(input => parseFloat(input.value));
    
    const totalResistance = resistances.reduce((acc, val) => acc + val, 0);
    const current = voltage / totalResistance;
    const voltages = resistances.map(r => (current * r).toFixed(2));
    
    document.getElementById('series-result').innerHTML = `
        <p>Resistencia Total: ${totalResistance.toFixed(2)} Ω</p>
        <p>Corriente: ${current.toFixed(2)} A</p>
        <p>Voltajes: ${voltages.join(' V, ')} V</p>
    `;
}

function calculateParallel() {
    const voltage = parseFloat(document.getElementById('parallel-voltage').value);
    const resistances = Array.from(document.getElementById('parallel-resistance-values').children).map(input => parseFloat(input.value));
    
    const totalResistance = 1 / resistances.reduce((acc, val) => acc + 1/val, 0);
    const currents = resistances.map(r => (voltage / r).toFixed(2));
    
    document.getElementById('parallel-result').innerHTML = `
        <p>Resistencia Total: ${totalResistance.toFixed(2)} Ω</p>
        <p>Corrientes: ${currents.join(' A, ')} A</p>
    `;
}

function calculateMixed() {
    const voltage = parseFloat(document.getElementById('mixed-voltage').value);
    const resistances = Array.from(document.getElementById('mixed-resistance-values').children).map(input => parseFloat(input.value));
    
    // Simulación simple para un circuito mixto (para ejemplificar)
    // Aquí debería implementarse una solución más avanzada usando las Leyes de Ohm
    const totalResistance = resistances.reduce((acc, val) => acc + val, 0);
    const totalCurrent = voltage / totalResistance;
    
    // Ejemplo básico: supongamos que las primeras dos resistencias están en serie y las últimas dos en paralelo
    const seriesResistance = resistances.slice(0, 2).reduce((acc, val) => acc + val, 0);
    const parallelResistance = 1 / resistances.slice(2).reduce((acc, val) => acc + 1/val, 0);
    
    const seriesCurrent = voltage / seriesResistance;
    const parallelCurrent = voltage / parallelResistance;
    
    // Voltaje y corriente en cada resistencia (ejemplo)
    const voltages = resistances.map(r => (totalCurrent * r).toFixed(2));
    
    document.getElementById('mixed-result').innerHTML = `
        <p>Resistencia Total: ${totalResistance.toFixed(2)} Ω</p>
        <p>Corriente Total: ${totalCurrent.toFixed(2)} A</p>
        <p>Voltajes: ${voltages.join(' V, ')} V</p>
        <p>Corriente en serie: ${seriesCurrent.toFixed(2)} A</p>
        <p>Corriente en paralelo: ${parallelCurrent.toFixed(2)} A</p>
    `;
}
