import { openInNewTab } from "@/utils/openInNewTab";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/partners/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="min-h-screen w-full pt-12">
            <h1 className="text-6xl font-bold text-white text-center">OUR PARTNERS</h1>
            <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-32">
                <div className="flex items-center justify-center w-[170px] h-20">
                    <img
                        src="/MYHUD Logo.png"
                        alt="MYHUD Logo"
                        className="object-contain h-full max-w-full cursor-pointer"
                        onClick={() => openInNewTab("https://myhud.app")}
                    />
                </div>
                <div className="flex items-center justify-center w-[170px] h-20">
                    <img
                        src="/SCL Logo.png"
                        alt="SCL Logo"
                        className="object-contain h-full max-w-full cursor-pointer"
                        onClick={() => openInNewTab("https://scl.gg")}
                    />
                </div>
                <div className="flex items-center justify-center w-[170px] h-20">
                    <img
                        src="/faceit logo.jpg"
                        alt="Faceit Logo"
                        className="object-contain h-full max-w-full cursor-pointer"
                        onClick={() => openInNewTab("https://www.faceit.com")}
                    />
                </div>
            </div>
        </div>
    );
}
