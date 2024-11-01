# NixOS OneDrive Backup

## Final Config File

See configuration.nix

## Useful Commands

To check timers and how long until they trigger:

```bash
systemctl list-timers --all
```

To check our timer:

```bash
systemctl status onedrive-backup.timer
```

To check the service:

```bash
systemctl status onedrive-backup.service
```

Logs:

```bash
tail -f ~/sync.txt
journalctl -u onedrive-backup
```
