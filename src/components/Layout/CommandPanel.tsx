import React, { useEffect, useState, useCallback } from 'react';
import { Command } from 'cmdk';
import {
  LayoutGrid,
  Code2,
  FileText,
  User,
  Mail,
  Twitter,
  Linkedin,
  Github,
  Copy,
  X,
  Search,
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string[];
  group: string;
  onSelect: () => void;
}

const CommandPanel: React.FC = () => {
  const [open, setOpen] = useState(false);

  const navigate = useCallback((path: string) => {
    setOpen(false);
    window.location.href = path;
  }, []);

  const openExternal = useCallback((url: string) => {
    setOpen(false);
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setOpen(false);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  const commands: CommandItem[] = [
    {
      id: 'home',
      label: 'Go to Home',
      icon: <LayoutGrid className="w-[18px] h-[18px]" strokeWidth={1.5} />,
      shortcut: ['shift', 'H'],
      group: 'Navigation',
      onSelect: () => navigate('/'),
    },
    {
      id: 'projects',
      label: 'Go to Projects',
      icon: <Code2 className="w-[18px] h-[18px]" strokeWidth={1.5} />,
      shortcut: ['shift', 'P'],
      group: 'Navigation',
      onSelect: () => navigate('/project'),
    },
    {
      id: 'blog',
      label: 'Go to Blog',
      icon: <FileText className="w-[18px] h-[18px]" strokeWidth={1.5} />,
      shortcut: ['shift', 'B'],
      group: 'Navigation',
      onSelect: () => navigate('/blog'),
    },
    {
      id: 'about',
      label: 'Go to About',
      icon: <User className="w-[18px] h-[18px]" strokeWidth={1.5} />,
      shortcut: ['shift', 'A'],
      group: 'Navigation',
      onSelect: () => navigate('/about'),
    },
    {
      id: 'contact',
      label: 'Go to Contact',
      icon: <Mail className="w-[18px] h-[18px]" strokeWidth={1.5} />,
      shortcut: ['shift', 'C'],
      group: 'Navigation',
      onSelect: () => navigate('/contact'),
    },
    {
      id: 'twitter',
      label: 'X Profile',
      icon: <Twitter className="w-[18px] h-[18px]" strokeWidth={1.5} />,
      shortcut: ['shift', 'X'],
      group: 'Links',
      onSelect: () => openExternal('https://twitter.com/JudeTejada2'),
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      icon: <Linkedin className="w-[18px] h-[18px]" strokeWidth={1.5} />,
      shortcut: ['shift', 'L'],
      group: 'Links',
      onSelect: () => openExternal('https://www.linkedin.com/in/jude-tejada-696051199/'),
    },
    {
      id: 'github',
      label: 'GitHub Profile',
      icon: <Github className="w-[18px] h-[18px]" strokeWidth={1.5} />,
      shortcut: ['shift', 'G'],
      group: 'Links',
      onSelect: () => openExternal('https://github.com/JudeTejada'),
    },
    {
      id: 'copy',
      label: 'Copy Link',
      icon: <Copy className="w-[18px] h-[18px]" strokeWidth={1.5} />,
      shortcut: ['shift', 'Y'],
      group: 'General',
      onSelect: copyLink,
    },
  ];

  const groupedCommands = commands.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  // Keyboard shortcut to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Disable body scroll when panel is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Desktop Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200 transition-colors"
        aria-label="Open command palette"
      >
        <span className="text-xs font-medium">⌘K</span>
      </button>

      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Open command palette"
      >
        <Search className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Command Dialog */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={() => setOpen(false)}
          />

          {/* Dialog */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] max-w-[560px] max-h-[85vh] bg-white rounded-2xl shadow-2xl z-[101] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-gray-200">
              <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 shrink-0">
                <LayoutGrid className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[15px] text-gray-900 leading-tight">Home</p>
                <p className="text-[13px] text-gray-500 leading-tight">About me and what I'm up to</p>
              </div>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors shrink-0"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>
            </div>

            {/* Command Component */}
            <Command className="flex flex-col flex-1 overflow-hidden" loop>
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-200">
                <Search className="w-[18px] h-[18px] text-gray-400 shrink-0" strokeWidth={1.5} />
                <Command.Input
                  placeholder="Search for actions..."
                  className="flex-1 border-none text-[15px] outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
                  autoFocus
                />
              </div>

              {/* List */}
              <Command.List className="flex-1 overflow-y-auto p-2 max-h-[400px]">
                <Command.Empty className="py-8 text-center text-gray-500 text-sm">
                  No results found.
                </Command.Empty>

                {Object.entries(groupedCommands).map(([group, items]) => (
                  <Command.Group key={group}>
                    <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider select-none">
                      {group}
                    </div>
                    {items.map((item) => (
                      <Command.Item
                        key={item.id}
                        value={item.label}
                        onSelect={item.onSelect}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 aria-selected:bg-gray-100"
                      >
                        <span className="text-gray-500 shrink-0">
                          {item.icon}
                        </span>
                        <span className="flex-1 text-sm font-medium text-gray-900">
                          {item.label}
                        </span>
                        {item.shortcut && (
                          <kbd className="shrink-0 px-2 py-1 text-[11px] font-medium text-gray-500 bg-gray-100 border border-gray-200 rounded-md">
                            {item.shortcut.join(' + ')}
                          </kbd>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>
            </Command>

            {/* Footer */}
            <div className="hidden md:flex items-center gap-5 px-4 py-2.5 border-t border-gray-200 bg-gray-50 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <kbd className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] text-gray-500 bg-white border border-gray-200 rounded">↑</kbd>
                <kbd className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] text-gray-500 bg-white border border-gray-200 rounded">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] text-gray-500 bg-white border border-gray-200 rounded">↵</kbd>
                to select
              </span>
              <span className="flex-1" />
              <span className="flex items-center gap-1.5">
                <kbd className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] text-gray-500 bg-white border border-gray-200 rounded">esc</kbd>
                to close
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CommandPanel;
