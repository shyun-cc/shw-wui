<script setup lang="ts">
// See THIRD_PARTY_NOTICES.md for framework attribution.
// Upstream attribution: LICENSES/pure-admin-thin.MIT.txt.
import { useAdmin } from './runtime';
defineProps<{ permission?: string | string[] }>();
const admin = useAdmin();
</script>
<template><slot v-if="admin.can(permission)" /><slot v-else name="fallback" /></template>
