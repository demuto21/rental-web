@PostMapping("/{id}/upgrade")
public ResponseEntity<?> upgradeUser(@PathVariable Long id, @RequestBody Map<String, String> payload) {
    User user = userRepository.findById(id).orElseThrow();
    
    String newRole = payload.get("role"); // "DRIVER" ou "AGENCY"
    
    // Si il devient chauffeur, on peut aussi créer une entrée vide dans la table 'drivers'
    if (newRole.equals("DRIVER")) {
        user.setRole(Role.DRIVER);
        // Logique pour créer le profil driver...
    } else if (newRole.equals("AGENCY")) {
        user.setRole(Role.AGENCY);
        // Logique pour créer le profil agence...
    }
    
    User updatedUser = userRepository.save(user);
    return ResponseEntity.ok(updatedUser);
}