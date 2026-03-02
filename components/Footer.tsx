import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
    const [siteContent, setSiteContent] = useState<any>(null);

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => setSiteContent(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <footer className="bg-background-alt pt-16 pb-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <Link href="/" className="flex items-center gap-2">
                            <img
                                src="/logo.png"
                                alt="7 Fold Wonders"
                                className="h-24 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-slate-400 text-sm font-semibold leading-relaxed mt-4">
                            7foldwanders – A Travel Venture by Sevenfold Infratech Pvt Ltd (15 Years of Corporate Excellence)
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-slate-400 text-sm hover:text-secondary transition-colors">About Us</Link></li>
                            <li><Link href="/destinations" className="text-slate-400 text-sm hover:text-secondary transition-colors">Destinations</Link></li>
                            <li><Link href="/packages" className="text-slate-400 text-sm hover:text-secondary transition-colors">Packages</Link></li>
                            <li><Link href="/deals" className="text-slate-400 text-sm hover:text-secondary transition-colors">Flights</Link></li>
                            <li><Link href="/hotels" className="text-slate-400 text-sm hover:text-secondary transition-colors">Hotels</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white">Support</h4>
                        <ul className="space-y-2">
                            <li><Link href="/help" className="text-slate-400 text-sm hover:text-secondary transition-colors">Help Center</Link></li>
                            {siteContent?.contact?.email && (
                                <li><a href={`mailto:${siteContent.contact.email}`} className="text-slate-400 text-sm hover:text-primary transition-colors">Contact Us</a></li>
                            )}
                            <li><Link href="/privacy" className="text-slate-400 text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-slate-400 text-sm hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/cancellation" className="text-slate-400 text-sm hover:text-primary transition-colors">Cancellation Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white">Newsletter</h4>
                        <p className="text-slate-400 text-sm mb-4">Subscribe for travel deals and inspiration.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-white/5 border border-white/10 rounded-full py-2 px-4 text-white w-full text-sm focus:outline-none focus:border-primary placeholder:text-white/30"
                            />
                            <button className="btn btn-secondary px-4 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} 7 Fold Wonders. All rights reserved.</p>
                    <div className="flex gap-6">
                        {siteContent?.contact?.socials?.instagram && <a href={siteContent.contact.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>}
                        {siteContent?.contact?.socials?.twitter && <a href={siteContent.contact.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter</a>}
                        {siteContent?.contact?.socials?.facebook && <a href={siteContent.contact.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Facebook</a>}
                    </div>
                </div>
            </div>
        </footer>
    );
}
