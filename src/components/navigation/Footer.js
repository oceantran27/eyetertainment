export default function Footer() {
    return (
        <div className="w-full flex justify-center">
            <footer className="px-24 w-full py-6 pt-12">
                <footer className="rounded-lg md:py-8">
                    <div className="col-span-4 text-center flex flex-col lg:flex-row justify-between items-center pt-6 border-t border-zinc-500/40 mt-6">
                        <p className="text-zinc-300 font-normal">© {new Date().getUTCFullYear()} {" "}No rights reserved.</p>
                    </div>
                </footer>
            </footer>
        </div>
    );
}
