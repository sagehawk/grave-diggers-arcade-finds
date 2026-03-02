
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Download } from 'lucide-react';

interface DownloadLink {
    platform: string;
    url: string;
    label: string;
}

interface DownloadLinksFieldsProps {
    form: UseFormReturn<any>;
}

const platformOptions = [
    'Windows', 'Mac', 'Linux', 'Android', 'iOS',
    'Browser', 'Steam', 'Itch.io', 'Epic Games', 'GOG',
    'PlayStation', 'Xbox', 'Switch', 'Other'
];

const DownloadLinksFields: React.FC<DownloadLinksFieldsProps> = ({ form }) => {
    const downloadLinks: DownloadLink[] = form.watch('downloadLinks') || [];

    const addLink = () => {
        const current = form.getValues('downloadLinks') || [];
        form.setValue('downloadLinks', [
            ...current,
            { platform: 'Windows', url: '', label: '' }
        ]);
    };

    const removeLink = (index: number) => {
        const current = form.getValues('downloadLinks') || [];
        form.setValue(
            'downloadLinks',
            current.filter((_: DownloadLink, i: number) => i !== index)
        );
    };

    const updateLink = (index: number, field: keyof DownloadLink, value: string) => {
        const current = [...(form.getValues('downloadLinks') || [])];
        current[index] = { ...current[index], [field]: value };
        form.setValue('downloadLinks', current);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <label className="text-sm font-medium text-white flex items-center gap-2">
                        <Download size={16} className="text-ggrave-red" />
                        Download Links
                    </label>
                    <p className="text-sm text-gray-400 mt-1">
                        Add direct download links for each platform your game supports.
                    </p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addLink}
                    className="border-gray-700 text-white hover:bg-gray-800 hover:border-ggrave-red transition-all"
                >
                    <Plus size={14} className="mr-1" /> Add Link
                </Button>
            </div>

            {downloadLinks.length === 0 && (
                <div className="border border-dashed border-gray-700 rounded-lg p-6 text-center">
                    <Download size={32} className="mx-auto text-gray-600 mb-2" />
                    <p className="text-gray-500 text-sm">
                        No download links yet. Click "Add Link" to provide download URLs for your game.
                    </p>
                </div>
            )}

            <div className="space-y-3">
                {downloadLinks.map((link: DownloadLink, index: number) => (
                    <div
                        key={index}
                        className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-3 group hover:border-gray-600 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">
                                Link #{index + 1}
                            </span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeLink(index)}
                                className="text-gray-500 hover:text-red-400 hover:bg-red-900/20 h-7 w-7 p-0"
                            >
                                <Trash2 size={14} />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* Platform */}
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Platform</label>
                                <Select
                                    value={link.platform}
                                    onValueChange={(val) => updateLink(index, 'platform', val)}
                                >
                                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-9">
                                        <SelectValue placeholder="Platform" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-gray-700">
                                        {platformOptions.map((p) => (
                                            <SelectItem key={p} value={p}>
                                                {p}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Label */}
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Label</label>
                                <Input
                                    placeholder="e.g. v1.2 Installer"
                                    value={link.label}
                                    onChange={(e) => updateLink(index, 'label', e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-white h-9"
                                />
                            </div>

                            {/* URL */}
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Download URL</label>
                                <Input
                                    placeholder="https://..."
                                    value={link.url}
                                    onChange={(e) => updateLink(index, 'url', e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-white h-9"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DownloadLinksFields;
