import { Template } from "../components/Template";

export default function Fotos() {
    return (
        <Template>
            <div className="min-h-screen bg-gradient-to-b from-olive-50 via-olive-300 to-olive-600 flex flex-col items-center justify-center p-6">
                <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md text-center border border-olive-100">
                    <p className="text-olive-800"><strong>Tela de Fotos</strong></p>
                </div>
            </div>
        </Template>
    );
}