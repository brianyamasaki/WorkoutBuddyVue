<template>
  <div>
    <h1>Welcome to Workout Buddy</h1>
    <p>This is the legacy workout buddy that works without an account.</p>
    <p>
      Create a FREE user account that will securely keep track of your workouts.
      After you create an account, a button will allow you to import your
      current workout to the new account.
    </p>
    <WorkoutList />
  </div>
</template>

<script>
import WorkoutList from "../components/WorkoutList";

export default {
  name: "WorkoutPage",
  components: {
    WorkoutList,
  },
};
</script>