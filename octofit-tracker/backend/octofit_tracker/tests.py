from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def test_user_creation(self):
        user = User.objects.create(name='Test User', email='test@example.com', team='marvel', is_superhero=True)
        self.assertEqual(user.name, 'Test User')
        self.assertEqual(user.team, 'marvel')

    def test_team_creation(self):
        team = Team.objects.create(name='marvel', description='Marvel Team')
        self.assertEqual(team.name, 'marvel')

    def test_activity_creation(self):
        user = User.objects.create(name='Test User', email='test2@example.com', team='dc', is_superhero=True)
        activity = Activity.objects.create(user=user, activity_type='run', duration=30, date='2026-04-24')
        self.assertEqual(activity.activity_type, 'run')

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Pushups', description='Upper body', suggested_for='marvel')
        self.assertEqual(workout.name, 'Pushups')

    def test_leaderboard_creation(self):
        user = User.objects.create(name='Test User', email='test3@example.com', team='marvel', is_superhero=True)
        leaderboard = Leaderboard.objects.create(user=user, points=100, rank=1)
        self.assertEqual(leaderboard.points, 100)
