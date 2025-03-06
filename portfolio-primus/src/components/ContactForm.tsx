import { useState } from 'react';
import ThankYouText from './ThankYouText';

function submitRequest(body: { 
    message: string, 
    firstName: string, 
    lastName: string, 
    email: string,
    phone: string 
}): Promise<boolean> {
    return fetch('/.netlify/functions/sendMail', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(() => true)
    .catch((err) => {
        console.log(err);
        return false;
    });
}

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const success = await submitRequest(formData);
        setIsLoading(false);
        setIsSuccess(success);
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {isSuccess ? (
                <ThankYouText></ThankYouText>
            ) : (
                <>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-white/70 text-sm">First name *</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border border-white/30 p-3 text-white focus:outline-none focus:border-[#00FF85]"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-white/70 text-sm">Last name *</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border border-white/30 p-3 text-white focus:outline-none focus:border-[#00FF85]"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-white/70 text-sm">Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border border-white/30 p-3 text-white focus:outline-none focus:border-[#00FF85]"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-white/70 text-sm">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border border-white/30 p-3 text-white focus:outline-none focus:border-[#00FF85]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-white/70 text-sm">Message</label>
                        <textarea
                            rows={6}
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border border-white/30 p-3 text-white focus:outline-none focus:border-[#00FF85]"
                            required
                        ></textarea>
                    </div>
                    <div className="space-y-2">
                        <button
                            type="submit"
                            className="w-full bg-[#00FF85] text-[#2A2E3D] font-bold py-4 hover:bg-[#00FF85]/90 transition"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                </>
            )}
        </form>
    );
}
