type UserFormProps = {
    children: React.ReactNode;
};

export default function UserForm({ children }: UserFormProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex h-[560px] w-full max-w-4xl overflow-hidden rounded-lg shadow-lg">
                <div className="flex h-full w-1/2 flex-col items-center justify-center bg-[url('/OSSBranding.png')] bg-cover bg-center bg-no-repeat p-8" />
                <div className="flex h-full w-1/2 flex-col items-center justify-center p-8 text-center">
                    {children}
                </div>
            </div>
        </div>
    );
}
