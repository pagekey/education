{
  # Rest of configuration.nix here
  #

  # OneDrive Sync Service
  systemd.timers."onedrive-backup" = {
    wantedBy = [ "timers.target" ];
    timerConfig = {
      OnBootSec = "10m";
      OnUnitActiveSec = "10m";
      Unit = "onedrive-backup.service";
    };
  };
  systemd.services."onedrive-backup" = {
    script = ''
      ${pkgs.rclone}/bin/rclone sync /home/steve/p/ onedrive:nixos \
        --log-file /home/steve/sync.txt \
        -P \
        --log-level info \
        --exclude .git \
        --exclude node_modules
    '';
    serviceConfig = {
      Type = "oneshot";
      User = "steve";
    };
  };
}