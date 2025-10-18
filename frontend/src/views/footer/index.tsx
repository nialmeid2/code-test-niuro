import Container from "../container";


export default function Footer() {
    return <footer className="p-[1em] bg-blue-300 dark:bg-cyan-800 mt-[1em]">
        <Container>
            <div className="text-center">Movie Library Online&copy; - {new Date().getFullYear()}</div>
        </Container>
    </footer>
}