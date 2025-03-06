export default function ThankYouText() {
    return (<div className="text-center text-green-500">
        <div className="flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="ml-2 text-xl">Thank You! We'll reach you out as soon as possible.</span>
        </div>
    </div>);
}