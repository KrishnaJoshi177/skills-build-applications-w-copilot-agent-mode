from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='marvel', description='Marvel Team')
        dc = Team.objects.create(name='dc', description='DC Team')

        # Create Users
        users = [
            User(name='Spider-Man', email='spiderman@marvel.com', team='marvel', is_superhero=True),
            User(name='Iron Man', email='ironman@marvel.com', team='marvel', is_superhero=True),
            User(name='Wonder Woman', email='wonderwoman@dc.com', team='dc', is_superhero=True),
            User(name='Batman', email='batman@dc.com', team='dc', is_superhero=True),
        ]
        for user in users:
            user.save()

        # Create Workouts
        workouts = [
            Workout(name='Pushups', description='Upper body strength', suggested_for='marvel'),
            Workout(name='Running', description='Cardio endurance', suggested_for='dc'),
        ]
        for workout in workouts:
            workout.save()

        # Create Activities
        Activity.objects.create(user=users[0], activity_type='run', duration=30, date=date.today())
        Activity.objects.create(user=users[1], activity_type='pushup', duration=20, date=date.today())
        Activity.objects.create(user=users[2], activity_type='run', duration=25, date=date.today())
        Activity.objects.create(user=users[3], activity_type='pushup', duration=15, date=date.today())

        # Create Leaderboard
        Leaderboard.objects.create(user=users[0], points=120, rank=1)
        Leaderboard.objects.create(user=users[1], points=110, rank=2)
        Leaderboard.objects.create(user=users[2], points=105, rank=3)
        Leaderboard.objects.create(user=users[3], points=100, rank=4)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
