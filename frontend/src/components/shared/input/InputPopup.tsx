export default function InputPopup() {
    return (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md">
                <h1>Link Faceit team</h1>
                <form></form>
            </div>
        </div>
    );
}

// export default function InputPopup({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     return (
//         <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md">
//                 {children}
//             </div>
//         </div>
//     );
// }
