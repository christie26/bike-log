{
  description = "Python environment with Bleak on Apple Silicon (aarch64-darwin)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "aarch64-darwin";
      pkgs = import nixpkgs { inherit system; };

      pythonEnv = pkgs.python3.withPackages (ps: with ps; [
        bleak
        fitparse
        pandas
      ]);
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = [
          pythonEnv
        ];

        shellHook = ''
          echo "Python environment with Bleak loaded for macOS (aarch64-darwin)!"
          python --version
        '';
      };
    };
}
