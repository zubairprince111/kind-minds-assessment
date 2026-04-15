import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, Users, TrendingUp, LogOut, ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

interface Stats {
  total_count: number;
  avg_score: number;
  category_counts: Record<string, number>;
  daily_counts: { date: string; count: number }[];
  score_distribution: { range: string; count: number }[];
}

const categoryColors: Record<string, string> = {
  "Normal": "bg-emerald-500",
  "Mild Depression": "bg-yellow-500",
  "Moderate Depression": "bg-orange-500",
  "Severe Depression": "bg-red-500",
  "Profound Depression": "bg-red-700",
};

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      navigate("/admin/login");
      return;
    }

    setIsAdmin(true);
  };

  const fetchStats = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc("get_assessment_stats");
    if (error) {
      toast({ title: "Error", description: "Failed to load statistics", variant: "destructive" });
      console.error(error);
    } else {
      setStats(data as unknown as Stats);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth().then(() => fetchStats());
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (!isAdmin) return null;

  const totalResponses = stats?.total_count ?? 0;
  const totalCategories = stats?.category_counts ? Object.keys(stats.category_counts).length : 0;
  const maxDailyCount = stats?.daily_counts
    ? Math.max(...stats.daily_counts.map(d => d.count), 1)
    : 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <BarChart3 className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchStats} disabled={loading}
              className="border-slate-600 text-slate-300 hover:text-white">
              <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-400 hover:text-white">
              <LogOut className="w-4 h-4 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : stats ? (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Total Responses</p>
                      <p className="text-3xl font-bold text-white">{totalResponses}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Average Score</p>
                      <p className="text-3xl font-bold text-white">{stats.avg_score ?? "—"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20">
                      <BarChart3 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Categories Seen</p>
                      <p className="text-3xl font-bold text-white">{totalCategories}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category Breakdown */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.category_counts && Object.keys(stats.category_counts).length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(stats.category_counts).map(([category, count]) => {
                      const pct = totalResponses > 0 ? (count / totalResponses) * 100 : 0;
                      return (
                        <div key={category} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-300">{category}</span>
                            <span className="text-slate-400">{count} ({pct.toFixed(1)}%)</span>
                          </div>
                          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${categoryColors[category] || 'bg-primary'}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-4">No data yet</p>
                )}
              </CardContent>
            </Card>

            {/* Score Distribution */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.score_distribution && stats.score_distribution.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {stats.score_distribution.map(({ range, count }) => (
                      <div key={range} className="text-center p-4 bg-slate-700/50 rounded-lg">
                        <p className="text-2xl font-bold text-white">{count}</p>
                        <p className="text-xs text-slate-400 mt-1">{range}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-4">No data yet</p>
                )}
              </CardContent>
            </Card>

            {/* Daily Trend */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Daily Submissions (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.daily_counts && stats.daily_counts.length > 0 ? (
                  <div className="flex items-end gap-1 h-40">
                    {[...stats.daily_counts].reverse().map(({ date, count }) => (
                      <div key={date} className="flex-1 flex flex-col items-center gap-1 group relative">
                        <div
                          className="w-full bg-primary/80 hover:bg-primary rounded-t transition-colors min-h-[4px]"
                          style={{ height: `${(count / maxDailyCount) * 100}%` }}
                        />
                        <div className="absolute -top-8 bg-slate-700 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {date}: {count}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-4">No data yet</p>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <p className="text-slate-500 text-center py-20">No statistics available</p>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
