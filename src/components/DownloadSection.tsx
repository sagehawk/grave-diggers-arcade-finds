
import React from 'react';
import { Download, ExternalLink, Monitor, Apple, Smartphone, Globe, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DownloadLink {
    platform: string;
    url: string;
    label: string;
}

interface DownloadSectionProps {
    downloadLinks: DownloadLink[];
    storeLink?: string;
}

const platformIcons: Record<string, React.ReactNode> = {
    Windows: <Monitor size={18} />,
    Mac: <Apple size={18} />,
    Linux: <Monitor size={18} />,
    Android: <Smartphone size={18} />,
    iOS: <Smartphone size={18} />,
    Browser: <Globe size={18} />,
    Steam: <Gamepad2 size={18} />,
    'Itch.io': <Gamepad2 size={18} />,
    'Epic Games': <Gamepad2 size={18} />,
    GOG: <Gamepad2 size={18} />,
    PlayStation: <Gamepad2 size={18} />,
    Xbox: <Gamepad2 size={18} />,
    Switch: <Gamepad2 size={18} />,
    Other: <Download size={18} />,
};

const platformColors: Record<string, string> = {
    Windows: 'from-blue-600 to-blue-800',
    Mac: 'from-gray-500 to-gray-700',
    Linux: 'from-orange-600 to-orange-800',
    Android: 'from-green-600 to-green-800',
    iOS: 'from-gray-400 to-gray-600',
    Browser: 'from-purple-600 to-purple-800',
    Steam: 'from-[#1b2838] to-[#2a475e]',
    'Itch.io': 'from-red-500 to-red-700',
    'Epic Games': 'from-gray-700 to-gray-900',
    GOG: 'from-violet-600 to-violet-800',
    PlayStation: 'from-blue-700 to-blue-900',
    Xbox: 'from-green-700 to-green-900',
    Switch: 'from-red-600 to-red-800',
    Other: 'from-gray-600 to-gray-800',
};

const DownloadSection: React.FC<DownloadSectionProps> = ({ downloadLinks, storeLink }) => {
    const hasDownloads = downloadLinks && downloadLinks.length > 0;
    const hasStoreLink = storeLink && storeLink.trim();

    if (!hasDownloads && !hasStoreLink) return null;

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-ggrave-red/20 rounded-lg">
                    <Download size={22} className="text-ggrave-red" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Download & Play</h2>
                    <p className="text-sm text-gray-400">Get the game for your platform</p>
                </div>
            </div>

            {hasDownloads && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {downloadLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r ${platformColors[link.platform] || platformColors.Other
                                } hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl overflow-hidden`}
                        >
                            {/* Shine effect on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-transparent via-white to-transparent transition-opacity duration-500" />

                            <div className="flex-shrink-0 text-white/90">
                                {platformIcons[link.platform] || platformIcons.Other}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-white text-sm">{link.platform}</div>
                                {link.label && (
                                    <div className="text-xs text-white/70 truncate">{link.label}</div>
                                )}
                            </div>
                            <ExternalLink size={14} className="text-white/50 group-hover:text-white/80 transition-colors flex-shrink-0" />
                        </a>
                    ))}
                </div>
            )}

            {hasStoreLink && (
                <a
                    href={storeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full p-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-white text-sm font-medium transition-all hover:scale-[1.01]"
                >
                    <ExternalLink size={14} />
                    View on Store Page
                </a>
            )}
        </div>
    );
};

export default DownloadSection;
