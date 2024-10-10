export default function Footer() {
    return (
        <footer className="flex items-center justify-center bg-brown-900 py-3 text-white">
            <span className="font-medium">© {new Date().getFullYear()} Choco. All rights reserved.</span>
        </footer>
    );
}