from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Create Teams
        try:
            Team.objects.all().delete()
            marvel = Team.objects.create(name='marvel', description='Marvel Team')
            dc = Team.objects.create(name='dc', description='DC Team')
            self.stdout.write(self.style.SUCCESS('✅ Teams created'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error creating teams: {e}'))

        # Create Users
        try:
            User.objects.all().delete()
            user1 = User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team='marvel', is_superhero=True)
            user2 = User.objects.create(name='Iron Man', email='ironman@marvel.com', team='marvel', is_superhero=True)
            user3 = User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team='dc', is_superhero=True)
            user4 = User.objects.create(name='Batman', email='batman@dc.com', team='dc', is_superhero=True)
            self.stdout.write(self.style.SUCCESS('✅ Users created'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error creating users: {e}'))

        # Create Workouts
        try:
            Workout.objects.all().delete()
            workout1 = Workout.objects.create(name='Pushups', description='Upper body strength', suggested_for='marvel')
            workout2 = Workout.objects.create(name='Running', description='Cardio endurance', suggested_for='dc')
            self.stdout.write(self.style.SUCCESS('✅ Workouts created'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error creating workouts: {e}'))

        # Create Activities
        try:
            Activity.objects.all().delete()
            Activity.objects.bulk_create([
                Activity(user_name='Spider-Man', user_email='spiderman@marvel.com', activity_type='run', duration=30, date=date.today()),
                Activity(user_name='Iron Man', user_email='ironman@marvel.com', activity_type='pushup', duration=20, date=date.today()),
                Activity(user_name='Wonder Woman', user_email='wonderwoman@dc.com', activity_type='run', duration=25, date=date.today()),
                Activity(user_name='Batman', user_email='batman@dc.com', activity_type='pushup', duration=15, date=date.today()),
            ])
            self.stdout.write(self.style.SUCCESS('✅ Activities created'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error creating activities: {e}'))

        # Create Leaderboard
        try:
            Leaderboard.objects.all().delete()
            Leaderboard.objects.bulk_create([
                Leaderboard(user_name='Spider-Man', user_email='spiderman@marvel.com', points=120, rank=1),
                Leaderboard(user_name='Iron Man', user_email='ironman@marvel.com', points=110, rank=2),
                Leaderboard(user_name='Wonder Woman', user_email='wonderwoman@dc.com', points=105, rank=3),
                Leaderboard(user_name='Batman', user_email='batman@dc.com', points=100, rank=4),
            ])
            self.stdout.write(self.style.SUCCESS('✅ Leaderboard created'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error creating leaderboard: {e}'))

        self.stdout.write(self.style.SUCCESS('✅ Database population complete.'))
