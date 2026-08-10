'use client';

export default function PrimeiroComponente() {
    function clique() {
        alert('Você clicou no botão!');
        console.log('Você clicou no botão!');
    }
    return(
        <div>
            <h1>Primeiro Componente</h1>
            <button onClick={clique} className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 transition-colors">
                Não Clique Aqui!
            </button>
        </div>
    )
}