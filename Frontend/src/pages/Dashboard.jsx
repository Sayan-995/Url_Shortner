import React, { useState, useEffect } from 'react';
import { Plus, Loader, Search, AlertCircle, Copy, ExternalLink, Trash2, BarChart3 } from 'lucide-react';
import { useUrls } from '../hooks/useUrls';
import { isValidUrl } from '../utils/helpers';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { urls, isLoading, fetchUrls, shortenUrl, deleteUrl } = useUrls();
  const [urlInput, setUrlInput] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleShortenUrl = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!urlInput.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(urlInput)) {
      setError('Please enter a valid URL (starting with http:// or https://)');
      return;
    }

    setIsCreating(true);
    try {
      const result = await shortenUrl(urlInput);
      setSuccess(`✨ URL shortened! Short URL: ${result.shorturl}`);
      setUrlInput('');
      await fetchUrls();
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to shorten URL';
      setError(message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyLink = (code) => {
    const shortUrl = `${window.location.origin}/${code}`;
    navigator.clipboard.writeText(shortUrl);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const handleDelete = async (code) => {
    if (confirm('Are you sure you want to delete this URL?')) {
      try {
        await deleteUrl(code);
        setSuccess('URL deleted successfully');
        await fetchUrls();
      } catch (err) {
        setError(err.message || 'Failed to delete URL');
      }
    }
  };

  const filteredUrls = urls.filter(
    (url) =>
      url.originalurl?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.shorturl?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
          <div className="absolute top-32 right-0 w-96 h-96 bg-primary-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-300 via-accent-300 to-primary-300 bg-clip-text text-transparent mb-4">
            URL Shortener Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform long URLs into shareable links and track analytics in real-time
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* URL Creation Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-vibrant rounded-3xl opacity-20 blur-2xl"></div>
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">Create New Short URL</h2>

            {error && (
              <Alert type="error" message={error} onClose={() => setError('')} autoClose={false} className="mb-4" />
            )}
            {success && (
              <Alert type="success" message={success} onClose={() => setSuccess('')} className="mb-4" />
            )}

            <form onSubmit={handleShortenUrl} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/very/long/url/path/here"
                    className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition backdrop-blur-sm"
                    disabled={isCreating}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-8 py-4 bg-gradient-vibrant text-white font-bold rounded-xl hover:shadow-glow-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 whitespace-nowrap group"
                >
                  {isCreating ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      <span>Shortening...</span>
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      <span>Shorten</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-400">
                ⚡ Instant shortening • 📊 Real-time analytics • 🔗 Easy sharing
              </p>
            </form>
          </div>
        </div>

        {/* URLs List Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Your Links
                {urls.length > 0 && (
                  <span className="text-accent-400 ml-3 text-2xl">({urls.length})</span>
                )}
              </h2>
              <p className="text-gray-400 text-sm mt-1">Manage and track all your shortened URLs</p>
            </div>
            {urls.length > 0 && (
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search URLs..."
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition"
                />
              </div>
            )}
          </div>

          {isLoading ? (
            <LoadingSpinner fullScreen={false} />
          ) : filteredUrls.length === 0 ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-card rounded-3xl"></div>
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-16 text-center">
                <div className="inline-block p-4 bg-accent-500/20 rounded-full mb-4">
                  <AlertCircle size={48} className="text-accent-400" />
                </div>
                <p className="text-gray-200 text-lg font-medium mb-2">No URLs yet</p>
                <p className="text-gray-400">
                  {urls.length === 0
                    ? 'Create your first shortened URL above to get started!'
                    : 'No URLs match your search. Try a different term.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredUrls.map((url) => (
                <div
                  key={url.code}
                  className="group relative backdrop-blur-xl bg-white/10 border border-white/20 hover:border-primary-500/50 rounded-xl p-4 transition-all duration-300 hover:bg-white/15"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Left: Link info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="inline-block px-2.5 py-1 bg-accent-500/30 text-accent-300 text-xs font-bold rounded-lg">
                          {url.code}
                        </span>
                        <span className="text-gray-500 text-xs hidden sm:inline">
                          {url.createdAt ? new Date(url.createdAt).toLocaleDateString() : ''}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm truncate mb-2">{url.originalurl}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-primary-300 font-mono text-sm font-semibold">{url.shorturl}</span>
                        {copiedCode === url.code && (
                          <span className="text-success-400 text-xs font-bold animate-pulse">✓ Copied!</span>
                        )}
                      </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex items-center gap-2">
                      {/* Copy Button - Large and prominent */}
                      <button
                        onClick={() => handleCopyLink(url.code)}
                        className="flex-1 sm:flex-initial px-4 py-2 bg-gradient-vibrant text-white font-semibold rounded-lg hover:shadow-glow-accent transition-all flex items-center justify-center gap-2 group/btn"
                        title="Copy link"
                      >
                        <Copy size={16} />
                        <span className="sm:hidden">Copy</span>
                      </button>

                      {/* Analytics Button */}
                      <button
                        onClick={() => navigate(`/analytics/${url.code}`)}
                        className="p-2 bg-white/10 hover:bg-accent-500/30 text-accent-300 rounded-lg transition-all"
                        title="View analytics"
                      >
                        <BarChart3 size={18} />
                      </button>

                      {/* Open Button */}
                      <button
                        onClick={() => window.open(`https://${url.shorturl}`, '_blank')}
                        className="p-2 bg-white/10 hover:bg-primary-500/30 text-primary-300 rounded-lg transition-all"
                        title="Open in new tab"
                      >
                        <ExternalLink size={18} />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(url.code)}
                        className="p-2 bg-white/10 hover:bg-danger-500/30 text-danger-300 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
